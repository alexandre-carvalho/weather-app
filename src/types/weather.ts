// Weather condition types
export type WeatherCondition = 
  | 'clear' 
  | 'clouds' 
  | 'rain' 
  | 'drizzle'
  | 'snow' 
  | 'thunderstorm' 
  | 'mist'
  | 'fog'
  | 'haze';

// Current weather data
export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  condition: WeatherCondition;
  isDay: boolean;
  visibility: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  dt: number;
}

// Forecast day data
export interface ForecastDay {
  date: Date;
  dateString: string;
  dayName: string;
  tempMin: number;
  tempMax: number;
  icon: string;
  description: string;
  condition: WeatherCondition;
}

// Geolocation coordinates
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// City search result
export interface CitySearchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

// Weather API raw response types
export interface OpenWeatherCurrentResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  name: string;
  dt: number;
}

export interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}

export interface OpenWeatherGeoResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// Theme type based on weather
export type WeatherTheme = 
  | 'gradient-clear-day'
  | 'gradient-clear-night'
  | 'gradient-cloudy'
  | 'gradient-rainy'
  | 'gradient-snow'
  | 'gradient-storm'
  | 'gradient-mist';

// Error types
export interface WeatherError {
  type: 'geolocation' | 'api' | 'not-found' | 'network';
  message: string;
}
