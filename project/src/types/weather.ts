export interface LaunchSite {
  id: string;
  name: string;
  elevation: number;
  latitude: number;
  longitude: number;
  orientation: string;
  maxWind: number;
}

export interface WeatherCondition {
  date: string;
  windSpeed: number;
  windDirection: number;
  windGust: number;
  temperature: number;
  dewPoint: number;
  tcon: number;
  thermalStrength: number;
  topOfLift: number;
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
  cape?: number;
  liftedIndex?: number;
  convergence?: number;
  relativeHumidity?: number;
  cloudCover?: number;
  windDirectionMatch?: boolean;
  rainInfo?: string;
}

export interface SiteForecast {
  site: LaunchSite;
  forecast: WeatherCondition[];
}
