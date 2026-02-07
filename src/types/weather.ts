// Weather condition types
export type WeatherCondition =
  | "clear"
  | "clouds"
  | "rain"
  | "drizzle"
  | "snow"
  | "thunderstorm"
  | "mist"
  | "fog"
  | "haze";

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

// 3-hour interval forecast data
export interface HourlyForecast {
  dt: number;
  time: string;
  temp: number;
  icon: string;
  description: string;
  condition: WeatherCondition;
}

// Air quality data
export type AQILevel = 1 | 2 | 3 | 4 | 5;
export type AQIQuality = 'Boa' | 'Razoável' | 'Moderada' | 'Ruim' | 'Muito Ruim';

export interface AirQualityComponents {
  co: number;      // Carbon monoxide, μg/m3
  no: number;      // Nitrogen monoxide, μg/m3
  no2: number;     // Nitrogen dioxide, μg/m3
  o3: number;      // Ozone, μg/m3
  so2: number;     // Sulphur dioxide, μg/m3
  pm2_5: number;   // Fine particles matter, μg/m3
  pm10: number;    // Coarse particulate matter, μg/m3
  nh3: number;     // Ammonia, μg/m3
}

export interface AirQualityData {
  aqi: AQILevel;
  quality: AQIQuality;
  components: AirQualityComponents;
  mainPollutant: string;
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

export interface OpenWeatherAirPollutionResponse {
  list: Array<{
    main: {
      aqi: AQILevel;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }>;
}


// Theme type based on weather
export type WeatherTheme =
  | "gradient-clear-day"
  | "gradient-clear-night"
  | "gradient-cloudy"
  | "gradient-rainy"
  | "gradient-snow"
  | "gradient-storm"
  | "gradient-mist";

// Error types
export interface WeatherError {
  type: "geolocation" | "api" | "not-found" | "network";
  message: string;
}
