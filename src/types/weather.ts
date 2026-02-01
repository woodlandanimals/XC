export interface LaunchSite {
  name: string;
  latitude: number;
  longitude: number;
  elevation: number; // Feet MSL
  orientation: string; // e.g., 'S', 'SW', 'W'
  maxWind: number; // mph
  description?: string;
}

export interface WeatherCondition {
  date: string;
  windSpeed: number; // mph
  windDirection: number; // degrees
  windGust: number; // mph
  temperature: number; // Fahrenheit
  dewPoint: number; // Fahrenheit
  tcon: number; // Thermal Condensation Height (Fahrenheit trigger temp)
  thermalStrength: number; // 0-10 scale
  topOfLift: number; // Feet MSL
  flyability: 'good' | 'marginal' | 'poor';
  conditions: string;
  soaringFlyability: 'good' | 'marginal' | 'poor';
  thermalFlyability: 'good' | 'marginal' | 'poor';
  launchTime: string;
  wind850mb?: number;
  windDir850mb?: number;
  wind700mb?: number;
  windDir700mb?: number;
  blDepth?: number;
  cape: number;
  liftedIndex: number;
  convergence: number;
  relativeHumidity: number;
  cloudCover: number;
  windDirectionMatch: boolean;
  rainInfo?: string;
}

export interface SiteForecast {
  site: LaunchSite;
  forecast: WeatherCondition[];
}
