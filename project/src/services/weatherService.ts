import { LaunchSite, WeatherCondition, SiteForecast } from '../types/weather';
import { launchSites } from '../data/launchSites';

const weatherCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000;

let lastApiCall = 0;
const MIN_API_INTERVAL = 100;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getCacheKey = (site: LaunchSite) => {
  return `${site.latitude.toFixed(4)},${site.longitude.toFixed(4)}`;
};

const fetchHRRRData = async (site: LaunchSite) => {
  try {
    const cacheKey = getCacheKey(site) + '-hrrr';
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const timeSinceLastCall = Date.now() - lastApiCall;
    if (timeSinceLastCall < MIN_API_INTERVAL) {
      await delay(MIN_API_INTERVAL - timeSinceLastCall);
    }

    lastApiCall = Date.now();

    const params = new URLSearchParams({
      latitude: site.latitude.toFixed(4),
      longitude: site.longitude.toFixed(4),
      hourly: [
        'temperature_2m',
        'dew_point_2m',
        'relative_humidity_2m',
        'cloud_cover',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m',
        'cape',
        'lifted_index',
        'precipitation',
        'precipitation_probability'
      ].join(','),
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      timezone: 'America/Los_Angeles',
      forecast_days: 2
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error for ${site.name}:`, errorText);
      throw new Error(`Open-Meteo API error: ${response.status}`);
    }

    const data = await response.json();

    weatherCache.set(cacheKey, { data, timestamp: Date.now() });

    return data;

  } catch (error) {
    console.error(`Failed to fetch HRRR data for ${site.name}:`, error);

    const cacheKey = getCacheKey(site) + '-hrrr';
    const cached = weatherCache.get(cacheKey);
    if (cached) {
      return cached.data;
    }

    return null;
  }
};

const fetchECMWFData = async (site: LaunchSite) => {
  try {
    const cacheKey = getCacheKey(site) + '-ecmwf';
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const timeSinceLastCall = Date.now() - lastApiCall;
    if (timeSinceLastCall < MIN_API_INTERVAL) {
      await delay(MIN_API_INTERVAL - timeSinceLastCall);
    }

    lastApiCall = Date.now();

    const params = new URLSearchParams({
      latitude: site.latitude.toFixed(4),
      longitude: site.longitude.toFixed(4),
      hourly: [
        'temperature_2m',
        'dew_point_2m',
        'relative_humidity_2m',
        'cloud_cover',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m',
        'precipitation',
        'precipitation_probability'
      ].join(','),
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      timezone: 'America/Los_Angeles',
      forecast_days: 7
    });

    const url = `https://api.open-meteo.com/v1/ecmwf?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ECMWF API Error for ${site.name}:`, errorText);
      throw new Error(`Open-Meteo ECMWF API error: ${response.status}`);
    }

    const data = await response.json();

    weatherCache.set(cacheKey, { data, timestamp: Date.now() });

    return data;

  } catch (error) {
    console.error(`Failed to fetch ECMWF data for ${site.name}:`, error);

    const cacheKey = getCacheKey(site) + '-ecmwf';
    const cached = weatherCache.get(cacheKey);
    if (cached) {
      return cached.data;
    }

    return null;
  }
};

const processECMWFDataForDay = (site: LaunchSite, data: any, targetDate: string): WeatherCondition | null => {
  try {
    if (!data || !data.hourly) {
      return null;
    }

    const hourly = data.hourly;

    const targetIndices: number[] = [];
    hourly.time.forEach((time: string, index: number) => {
      const dt = new Date(time);
      const dateStr = dt.toISOString().split('T')[0];
      const hour = dt.getHours();

      if (dateStr === targetDate && hour >= 10 && hour <= 14) {
        targetIndices.push(index);
      }
    });

    if (targetIndices.length === 0) {
      return null;
    }

    const noonIndex = targetIndices.reduce((closest, current) => {
      const closestHour = new Date(hourly.time[closest]).getHours();
      const currentHour = new Date(hourly.time[current]).getHours();
      return Math.abs(currentHour - 12) < Math.abs(closestHour - 12) ? current : closest;
    });

    const temperature = hourly.temperature_2m[noonIndex];
    const dewPoint = hourly.dew_point_2m[noonIndex];
    const windSpeed = Math.round(hourly.wind_speed_10m[noonIndex]);
    const windDirection = hourly.wind_direction_10m[noonIndex];
    const windGust = Math.round(hourly.wind_gusts_10m[noonIndex]);
    const relativeHumidity = hourly.relative_humidity_2m[noonIndex];
    const cloudCover = hourly.cloud_cover[noonIndex];

    // ECMWF doesn't provide CAPE and lifted index, so we estimate
    const cape = 0;
    const liftedIndex = 0;
    const blDepth = undefined;

    const { lclMSL, tcon } = calculateLCL(temperature, dewPoint, site.elevation);

    const thermalStrength = calculateThermalStrength(
      temperature,
      dewPoint,
      windSpeed,
      site.elevation,
      cape,
      liftedIndex,
      blDepth
    );

    let topOfLift = calculateTopOfLift(
      lclMSL,
      thermalStrength,
      windSpeed,
      site.elevation,
      blDepth
    );

    const windDirectionMatch = checkWindDirectionMatch(windDirection, site.orientation);

    const soaringFlyability = determineSoaringFlyability(site, windSpeed, windGust, windDirectionMatch);
    const thermalFlyability = determineThermalFlyability(
      site,
      temperature,
      tcon,
      thermalStrength,
      windSpeed,
      windDirectionMatch,
      cloudCover
    );

    const { flyability, conditions } = determineFlyability(
      site,
      temperature,
      tcon,
      windSpeed,
      windGust,
      thermalStrength,
      topOfLift,
      windDirectionMatch,
      cloudCover,
      cape,
      liftedIndex
    );

    const launchTime = calculateLaunchTime(
      thermalFlyability,
      soaringFlyability,
      thermalStrength,
      windSpeed,
      temperature,
      tcon
    );

    const rainInfo = analyzeRain(hourly, targetDate);

    return {
      date: targetDate,
      windSpeed,
      windDirection,
      windGust,
      temperature: Math.round(temperature),
      dewPoint: Math.round(dewPoint),
      tcon,
      thermalStrength,
      topOfLift: Math.round(topOfLift),
      flyability,
      conditions,
      soaringFlyability,
      thermalFlyability,
      launchTime,
      wind850mb: undefined,
      windDir850mb: undefined,
      wind700mb: undefined,
      windDir700mb: undefined,
      blDepth,
      cape: Math.round(cape),
      liftedIndex: Math.round(liftedIndex * 10) / 10,
      convergence: 0,
      relativeHumidity: Math.round(relativeHumidity),
      cloudCover: Math.round(cloudCover),
      windDirectionMatch,
      rainInfo
    };

  } catch (error) {
    console.error(`Failed to process ECMWF data for ${site.name} on ${targetDate}:`, error);
    return null;
  }
};

const processHRRRDataForDay = (site: LaunchSite, data: any, targetDate: string): WeatherCondition | null => {
  try {
    if (!data || !data.hourly) {
      return null;
    }

    const hourly = data.hourly;

    const targetIndices: number[] = [];
    hourly.time.forEach((time: string, index: number) => {
      const dt = new Date(time);
      const dateStr = dt.toISOString().split('T')[0];
      const hour = dt.getHours();

      if (dateStr === targetDate && hour >= 10 && hour <= 14) {
        targetIndices.push(index);
      }
    });

    if (targetIndices.length === 0) {
      return null;
    }

    const noonIndex = targetIndices.reduce((closest, current) => {
      const closestHour = new Date(hourly.time[closest]).getHours();
      const currentHour = new Date(hourly.time[current]).getHours();
      return Math.abs(currentHour - 12) < Math.abs(closestHour - 12) ? current : closest;
    });

    const temperature = hourly.temperature_2m[noonIndex];
    const dewPoint = hourly.dew_point_2m[noonIndex];
    const windSpeed = Math.round(hourly.wind_speed_10m[noonIndex]);
    const windDirection = hourly.wind_direction_10m[noonIndex];
    const windGust = Math.round(hourly.wind_gusts_10m[noonIndex]);
    const relativeHumidity = hourly.relative_humidity_2m[noonIndex];
    const cloudCover = hourly.cloud_cover[noonIndex];

    const wind850mb = undefined;
    const windDir850mb = undefined;
    const wind700mb = undefined;
    const windDir700mb = undefined;

    const cape = hourly.cape?.[noonIndex] || 0;
    const liftedIndex = hourly.lifted_index?.[noonIndex] || 0;
    const blDepth = undefined;

    const { lclMSL, tcon } = calculateLCL(temperature, dewPoint, site.elevation);

    const thermalStrength = calculateThermalStrength(
      temperature,
      dewPoint,
      windSpeed,
      site.elevation,
      cape,
      liftedIndex,
      blDepth
    );

    let topOfLift = calculateTopOfLift(
      lclMSL,
      thermalStrength,
      windSpeed,
      site.elevation,
      blDepth
    );

    const windDirectionMatch = checkWindDirectionMatch(windDirection, site.orientation);

    const soaringFlyability = determineSoaringFlyability(site, windSpeed, windGust, windDirectionMatch);
    const thermalFlyability = determineThermalFlyability(
      site,
      temperature,
      tcon,
      thermalStrength,
      windSpeed,
      windDirectionMatch,
      cloudCover
    );

    const { flyability, conditions } = determineFlyability(
      site,
      temperature,
      tcon,
      windSpeed,
      windGust,
      thermalStrength,
      topOfLift,
      windDirectionMatch,
      cloudCover,
      cape,
      liftedIndex
    );

    const launchTime = calculateLaunchTime(
      thermalFlyability,
      soaringFlyability,
      thermalStrength,
      windSpeed,
      temperature,
      tcon
    );

    const rainInfo = analyzeRain(hourly, targetDate);

    return {
      date: targetDate,
      windSpeed,
      windDirection,
      windGust,
      temperature: Math.round(temperature),
      dewPoint: Math.round(dewPoint),
      tcon,
      thermalStrength,
      topOfLift: Math.round(topOfLift),
      flyability,
      conditions,
      soaringFlyability,
      thermalFlyability,
      launchTime,
      wind850mb: wind850mb ? Math.round(wind850mb) : undefined,
      windDir850mb,
      wind700mb: wind700mb ? Math.round(wind700mb) : undefined,
      windDir700mb,
      blDepth,
      cape: Math.round(cape),
      liftedIndex: Math.round(liftedIndex * 10) / 10,
      convergence: 0,
      relativeHumidity: Math.round(relativeHumidity),
      cloudCover: Math.round(cloudCover),
      windDirectionMatch,
      rainInfo
    };

  } catch (error) {
    console.error(`Failed to process HRRR data for ${site.name} on ${targetDate}:`, error);
    return null;
  }
};

const calculateLCL = (tempF: number, dewPointF: number, elevationFt: number): { lclMSL: number, tcon: number } => {
  const tempC = (tempF - 32) * 5/9;
  const dewPointC = (dewPointF - 32) * 5/9;

  const lclAGL_m = 125 * (tempC - dewPointC);
  const lclAGL_ft = lclAGL_m * 3.28084;
  let lclMSL_ft = elevationFt + lclAGL_ft;

  lclMSL_ft = Math.max(elevationFt + 500, lclMSL_ft);

  const tcon = dewPointF + (lclAGL_ft / 1000) * 5.4;

  return { lclMSL: lclMSL_ft, tcon: Math.round(tcon) };
};

const calculateThermalStrength = (
  tempF: number,
  dewPointF: number,
  windSpeed: number,
  elevationFt: number,
  cape: number,
  liftedIndex: number,
  blDepth?: number
): number => {
  const tempDewSpread = tempF - dewPointF;

  let strength = 0;

  if (tempDewSpread > 45) strength += 5;
  else if (tempDewSpread > 35) strength += 4.5;
  else if (tempDewSpread > 25) strength += 4;
  else if (tempDewSpread > 18) strength += 3;
  else if (tempDewSpread > 15) strength += 2.5;
  else if (tempDewSpread > 12) strength += 2;
  else if (tempDewSpread > 8) strength += 1.5;
  else if (tempDewSpread > 6) strength += 1;

  if (tempF > 90) strength += 2;
  else if (tempF > 80) strength += 1.5;
  else if (tempF > 70) strength += 1;
  else if (tempF > 65) strength += 0.5;
  else if (tempF > 60) strength += 0.3;
  else if (tempF < 60) strength -= 1;

  if (cape > 1500) strength += 1.5;
  else if (cape > 800) strength += 1;
  else if (cape > 400) strength += 0.5;
  else if (cape < 50) strength -= 0.5;

  if (liftedIndex < -4) strength += 1;
  else if (liftedIndex < -2) strength += 0.5;
  else if (liftedIndex > 2) strength -= 1;
  else if (liftedIndex > 4) strength -= 1.5;

  if (blDepth && blDepth > 8000) strength += 0.5;
  else if (blDepth && blDepth < 3000) strength -= 0.5;

  if (elevationFt > 5000) strength += 1;
  else if (elevationFt > 3000) strength += 0.5;
  else if (elevationFt < 2000) strength += 0.3;

  if (windSpeed > 25) strength -= 2;
  else if (windSpeed > 18) strength -= 1;
  else if (windSpeed >= 8 && windSpeed <= 15) strength += 0.5;
  else if (windSpeed >= 5 && windSpeed <= 10) strength += 0.3;
  else if (windSpeed < 3) strength -= 0.5;

  return Math.max(0, Math.min(10, Math.round(strength * 10) / 10));
};

const calculateTopOfLift = (
  lclMSL: number,
  thermalStrength: number,
  windSpeed: number,
  elevationFt: number,
  blDepth?: number
): number => {
  let topOfLift = lclMSL;

  if (blDepth) {
    topOfLift = Math.max(topOfLift, elevationFt + blDepth * 0.9);
  }

  if (thermalStrength >= 7) {
    topOfLift = lclMSL + 1000;
  } else if (thermalStrength >= 5) {
    topOfLift = lclMSL + 500;
  } else if (thermalStrength >= 3) {
    topOfLift = lclMSL - 500;
  } else {
    topOfLift = elevationFt + Math.max(500, (lclMSL - elevationFt) * 0.6);
  }

  if (windSpeed > 15) {
    topOfLift = topOfLift - 800;
  } else if (windSpeed > 10) {
    topOfLift = topOfLift - 400;
  }

  return Math.max(elevationFt + 500, topOfLift);
};

const analyzeRain = (hourly: any, targetDate: string): string | undefined => {
  const rainHours: Array<{ hour: number, precip: number, prob: number }> = [];

  hourly.time.forEach((time: string, index: number) => {
    const dt = new Date(time);
    const dateStr = dt.toISOString().split('T')[0];
    const hour = dt.getHours();

    if (dateStr === targetDate) {
      const precip = hourly.precipitation?.[index] || 0;
      const prob = hourly.precipitation_probability?.[index] || 0;

      if (precip > 0.01 || prob > 40) {
        rainHours.push({ hour, precip, prob });
      }
    }
  });

  if (rainHours.length === 0) return undefined;

  const morningRain = rainHours.filter(h => h.hour >= 6 && h.hour < 12);
  const afternoonRain = rainHours.filter(h => h.hour >= 12 && h.hour < 18);
  const eveningRain = rainHours.filter(h => h.hour >= 18);

  if (rainHours.length >= 10) {
    return 'Rain expected all day';
  }

  const periods = [];
  if (morningRain.length >= 3) periods.push('morning');
  if (afternoonRain.length >= 3) periods.push('afternoon');
  if (eveningRain.length >= 2) periods.push('evening');

  if (periods.length === 0 && rainHours.length > 0) {
    const hours = rainHours.map(h => h.hour);
    const minHour = Math.min(...hours);
    const maxHour = Math.max(...hours);
    const formatHour = (h: number) => h === 12 ? '12pm' : h > 12 ? `${h-12}pm` : `${h}am`;
    if (minHour === maxHour) {
      return `Rain expected around ${formatHour(minHour)}`;
    }
    return `Rain expected ${formatHour(minHour)}-${formatHour(maxHour)}`;
  }

  return `Rain expected in ${periods.join(' and ')}`;
};

const checkWindDirectionMatch = (windDir: number, siteOrientation: string): boolean => {
  const orientationRanges: { [key: string]: [number, number][] } = {
    'N': [[345, 360], [0, 15]],
    'NE': [[15, 75]],
    'E': [[75, 105]],
    'SE': [[105, 165]],
    'S': [[165, 195]],
    'SW': [[195, 255]],
    'W': [[255, 285]],
    'NW': [[285, 345]],
    'SW-W': [[195, 285]],
    'W-NW': [[245, 345]],
    'SW-NW': [[195, 345]],
    'W-SW': [[225, 285]],
    'E-SE': [[75, 165]],
    'NW-N': [[315, 360], [0, 15]]
  };

  const ranges = orientationRanges[siteOrientation];
  if (!ranges) return false;

  return ranges.some(([min, max]) => windDir >= min && windDir <= max);
};

const calculateLaunchTime = (
  thermalFlyability: 'good' | 'marginal' | 'poor',
  soaringFlyability: 'good' | 'marginal' | 'poor',
  thermalStrength: number,
  windSpeed: number,
  temperature: number,
  tcon: number
): string => {
  const tempDeficit = tcon - temperature;

  if (thermalFlyability === 'good' && soaringFlyability === 'poor') {
    if (thermalStrength >= 7) return '11:00 AM';
    if (thermalStrength >= 5) return '11:30 AM';
    return '12:00 PM';
  }

  if (soaringFlyability === 'good' && thermalFlyability === 'poor') {
    if (windSpeed >= 15) return '9:00 AM';
    if (windSpeed >= 12) return '10:00 AM';
    return '10:30 AM';
  }

  if (soaringFlyability === 'good' && thermalFlyability === 'good') {
    if (thermalStrength >= 6 && tempDeficit <= 3) return '11:00 AM';
    return '10:30 AM';
  }

  if (soaringFlyability === 'marginal' && thermalFlyability === 'good') {
    if (thermalStrength >= 7) return '11:30 AM';
    return '12:00 PM';
  }

  if (soaringFlyability === 'good' && thermalFlyability === 'marginal') {
    return '10:00 AM';
  }

  if (thermalFlyability === 'marginal') {
    if (tempDeficit <= 5) return '12:00 PM';
    return '1:00 PM';
  }

  if (soaringFlyability === 'marginal') {
    return '11:00 AM';
  }

  return '12:00 PM';
};

const determineSoaringFlyability = (
  site: LaunchSite,
  windSpeed: number,
  windGust: number,
  windDirectionMatch: boolean
): 'good' | 'marginal' | 'poor' => {
  if (!windDirectionMatch) return 'poor';

  if (windSpeed < 8) return 'poor';
  if (windSpeed > 20) return 'poor';
  if (windGust > 20) return 'poor';

  if (windSpeed >= 10 && windSpeed <= 14 && windGust <= 20) return 'good';
  if (windSpeed >= 8 && windSpeed <= 20 && windGust <= 20) return 'marginal';

  return 'poor';
};

const determineThermalFlyability = (
  site: LaunchSite,
  temperature: number,
  tcon: number,
  thermalStrength: number,
  windSpeed: number,
  windDirectionMatch: boolean,
  cloudCover: number
): 'good' | 'marginal' | 'poor' => {
  if (!windDirectionMatch) return 'poor';

  const tempDeficit = tcon - temperature;

  if (tempDeficit > 15) return 'poor';
  if (windSpeed > site.maxWind) return 'poor';
  if (windSpeed < 3) return thermalStrength > 6 ? 'marginal' : 'poor';

  if (thermalStrength >= 7 && tempDeficit <= 3 && windSpeed <= site.maxWind * 0.7) return 'good';
  if (thermalStrength >= 5 && tempDeficit <= 5) return 'good';
  if (thermalStrength >= 3 && tempDeficit <= 8) return 'marginal';

  if (cloudCover > 75 && thermalStrength < 5) return 'poor';

  return 'poor';
};

const determineFlyability = (
  site: LaunchSite,
  temperature: number,
  tcon: number,
  windSpeed: number,
  windGust: number,
  thermalStrength: number,
  topOfLift: number,
  windDirectionMatch: boolean,
  cloudCover: number,
  cape: number,
  liftedIndex: number
): { flyability: 'good' | 'marginal' | 'poor', conditions: string } => {
  const tempDeficit = tcon - temperature;

  let flyability: 'good' | 'marginal' | 'poor' = 'poor';
  let conditions = '';

  if (!windDirectionMatch) {
    flyability = 'poor';
    conditions = `Wind direction unfavorable for ${site.orientation} site`;
  } else if (tempDeficit > 15) {
    flyability = 'poor';
    conditions = `Too cool: needs ${tcon}°F for thermals, only ${Math.round(temperature)}°F forecast`;
  } else if (tempDeficit > 8) {
    flyability = tempDeficit > 12 ? 'poor' : 'marginal';
    conditions = `Cool: needs ${tcon}°F for good thermals, ${Math.round(temperature)}°F forecast`;
  } else if (windSpeed > site.maxWind) {
    flyability = 'poor';
    conditions = `Too strong: ${windSpeed}mph exceeds ${site.maxWind}mph limit`;
  } else if (windGust > site.maxWind * 1.5) {
    flyability = 'marginal';
    conditions = `Strong gusts: G${windGust}mph, be cautious`;
  } else if (windSpeed < 2) {
    flyability = thermalStrength > 6 ? 'marginal' : 'poor';
    conditions = thermalStrength > 6 ? 'Light winds, strong thermals' : 'Too light, weak thermals';
  } else if (cloudCover > 75 && liftedIndex > 2) {
    flyability = 'marginal';
    conditions = `Overcast may limit thermals: ${Math.round(cloudCover)}% cloud cover`;
  } else if (thermalStrength >= 8 && windSpeed <= site.maxWind * 0.6 && tempDeficit <= 2 && cape > 400) {
    flyability = 'good';
    conditions = `Excellent post-frontal: ${thermalStrength}/10 thermals, CAPE ${Math.round(cape)}`;
  } else if (thermalStrength >= 7 && windSpeed <= site.maxWind * 0.7 && tempDeficit <= 3) {
    flyability = 'good';
    conditions = `Excellent: ${thermalStrength}/10 thermals, top ${Math.round(topOfLift/1000*10)/10}k`;
  } else if (thermalStrength >= 5 && windSpeed <= site.maxWind * 0.8 && tempDeficit <= 5) {
    flyability = 'good';
    conditions = `Good: ${thermalStrength}/10 thermals, top ${Math.round(topOfLift/1000*10)/10}k`;
  } else if (thermalStrength >= 3 && windSpeed <= site.maxWind * 0.9 && tempDeficit <= 8) {
    flyability = 'marginal';
    conditions = `Moderate: ${thermalStrength}/10 thermals, top ${Math.round(topOfLift/1000*10)/10}k`;
  } else {
    flyability = 'poor';
    conditions = `Stable conditions: ${thermalStrength}/10 thermals`;
  }

  return { flyability, conditions };
};

export const getWeatherForecast = async (): Promise<SiteForecast[]> => {
  const now = new Date();

  const getPacificDateString = (daysOffset: number = 0): string => {
    const date = new Date(now);
    date.setDate(date.getDate() + daysOffset);

    const pacificDateStr = date.toLocaleDateString('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const [month, day, year] = pacificDateStr.split('/');
    return `${year}-${month}-${day}`;
  };

  // Generate 7 days of target dates
  const targetDates = Array.from({ length: 7 }, (_, i) => getPacificDateString(i));

  const forecasts: SiteForecast[] = [];

  for (const site of launchSites) {
    // Fetch HRRR data for days 0-1 and ECMWF data for days 0-6
    const hrrrData = await fetchHRRRData(site);
    const ecmwfData = await fetchECMWFData(site);

    const forecastData: WeatherCondition[] = [];

    for (let i = 0; i < targetDates.length; i++) {
      const targetDate = targetDates[i];
      let dayForecast: WeatherCondition | null = null;

      // Use HRRR for days 0-1, ECMWF for days 2-6
      if (i <= 1 && hrrrData) {
        dayForecast = processHRRRDataForDay(site, hrrrData, targetDate);
      } else if (ecmwfData) {
        dayForecast = processECMWFDataForDay(site, ecmwfData, targetDate);
      }

      if (dayForecast) {
        forecastData.push(dayForecast);
      } else {
        // Fallback if no data available
        forecastData.push({
          date: targetDate,
          windSpeed: 0,
          windDirection: 0,
          windGust: 0,
          temperature: 0,
          dewPoint: 0,
          tcon: 0,
          thermalStrength: 0,
          topOfLift: site.elevation,
          flyability: 'poor' as const,
          conditions: 'Forecast not available',
          soaringFlyability: 'poor' as const,
          thermalFlyability: 'poor' as const,
          launchTime: '12:00 PM',
          cape: 0,
          liftedIndex: 0,
          convergence: 0,
          relativeHumidity: 0,
          cloudCover: 0,
          windDirectionMatch: false
        });
      }
    }

    forecasts.push({
      site,
      forecast: forecastData
    });
  }

  return forecasts;
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(degrees / 22.5) % 16];
};
