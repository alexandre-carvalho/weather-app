import type {
  WeatherData,
  ForecastDay,
  CitySearchResult,
  OpenWeatherCurrentResponse,
  OpenWeatherForecastResponse,
  OpenWeatherGeoResponse,
  WeatherCondition,
} from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

// Map OpenWeather condition to our WeatherCondition type
function mapCondition(main: string): WeatherCondition {
  const conditionMap: Record<string, WeatherCondition> = {
    'Clear': 'clear',
    'Clouds': 'clouds',
    'Rain': 'rain',
    'Drizzle': 'drizzle',
    'Snow': 'snow',
    'Thunderstorm': 'thunderstorm',
    'Mist': 'mist',
    'Fog': 'fog',
    'Haze': 'haze',
    'Smoke': 'mist',
    'Dust': 'mist',
    'Sand': 'mist',
    'Ash': 'mist',
    'Squall': 'rain',
    'Tornado': 'thunderstorm',
  };
  return conditionMap[main] || 'clouds';
}

// Check if it's currently day or night based on sunrise/sunset
function isDayTime(dt: number, sunrise: number, sunset: number): boolean {
  return dt >= sunrise && dt < sunset;
}

// Transform API response to our WeatherData format
function transformCurrentWeather(data: OpenWeatherCurrentResponse): WeatherData {
  const isDay = isDayTime(data.dt, data.sys.sunrise, data.sys.sunset);
  
  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    condition: mapCondition(data.weather[0].main),
    isDay,
    visibility: data.visibility / 1000, // Convert to km
    pressure: data.main.pressure,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezone: data.timezone,
    dt: data.dt,
  };
}

// Transform 5-day forecast API response
function transformForecast(data: OpenWeatherForecastResponse): ForecastDay[] {
  const dailyMap = new Map<string, {
    temps: number[];
    icons: string[];
    descriptions: string[];
    conditions: string[];
    date: Date;
  }>();

  // Group forecast data by day
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, {
        temps: [],
        icons: [],
        descriptions: [],
        conditions: [],
        date,
      });
    }
    
    const dayData = dailyMap.get(dateKey)!;
    dayData.temps.push(item.main.temp);
    dayData.icons.push(item.weather[0].icon);
    dayData.descriptions.push(item.weather[0].description);
    dayData.conditions.push(item.weather[0].main);
  });

  // Convert to ForecastDay array (skip today, get next 5 days)
  const today = new Date().toISOString().split('T')[0];
  const forecasts: ForecastDay[] = [];
  
  dailyMap.forEach((dayData, dateKey) => {
    if (dateKey === today || forecasts.length >= 5) return;
    
    // Get most common icon (around noon if possible)
    const midIndex = Math.floor(dayData.icons.length / 2);
    const icon = dayData.icons[midIndex] || dayData.icons[0];
    const description = dayData.descriptions[midIndex] || dayData.descriptions[0];
    const condition = dayData.conditions[midIndex] || dayData.conditions[0];
    
    forecasts.push({
      date: dayData.date,
      dateString: dateKey,
      dayName: dayData.date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      tempMin: Math.round(Math.min(...dayData.temps)),
      tempMax: Math.round(Math.max(...dayData.temps)),
      icon,
      description,
      condition: mapCondition(condition),
    });
  });

  return forecasts;
}

// User-friendly error messages
const USER_FRIENDLY_ERRORS = {
  SERVICE_UNAVAILABLE: 'Não foi possível conectar ao serviço de clima. Tente novamente em alguns instantes.',
  CITY_NOT_FOUND: 'Cidade não encontrada. Verifique o nome e tente novamente.',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet e tente novamente.',
  GENERIC_ERROR: 'Ocorreu um erro ao buscar os dados. Tente novamente.',
};

// Fetch current weather by coordinates
export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 401) {
        console.error('[WeatherAPI] API key authentication failed. Status:', response.status);
        throw new Error(USER_FRIENDLY_ERRORS.SERVICE_UNAVAILABLE);
      }
      console.error('[WeatherAPI] getCurrentWeather failed. Status:', response.status);
      throw new Error(USER_FRIENDLY_ERRORS.GENERIC_ERROR);
    }
    
    const data: OpenWeatherCurrentResponse = await response.json();
    return transformCurrentWeather(data);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('[WeatherAPI] Network error:', error);
      throw new Error(USER_FRIENDLY_ERRORS.NETWORK_ERROR);
    }
    // Re-throw if it's already our custom error
    if (error instanceof Error && Object.values(USER_FRIENDLY_ERRORS).includes(error.message)) {
      throw error;
    }
    console.error('[WeatherAPI] Unexpected error in getCurrentWeather:', error);
    throw new Error(USER_FRIENDLY_ERRORS.GENERIC_ERROR);
  }
}

// Fetch current weather by city name
export async function getCurrentWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=pt_br&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        console.error('[WeatherAPI] City not found:', city);
        throw new Error(USER_FRIENDLY_ERRORS.CITY_NOT_FOUND);
      }
      if (response.status === 401) {
        console.error('[WeatherAPI] API key authentication failed. Status:', response.status);
        throw new Error(USER_FRIENDLY_ERRORS.SERVICE_UNAVAILABLE);
      }
      console.error('[WeatherAPI] getCurrentWeatherByCity failed. Status:', response.status);
      throw new Error(USER_FRIENDLY_ERRORS.GENERIC_ERROR);
    }
    
    const data: OpenWeatherCurrentResponse = await response.json();
    return transformCurrentWeather(data);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('[WeatherAPI] Network error:', error);
      throw new Error(USER_FRIENDLY_ERRORS.NETWORK_ERROR);
    }
    if (error instanceof Error && Object.values(USER_FRIENDLY_ERRORS).includes(error.message)) {
      throw error;
    }
    console.error('[WeatherAPI] Unexpected error in getCurrentWeatherByCity:', error);
    throw new Error(USER_FRIENDLY_ERRORS.GENERIC_ERROR);
  }
}

// Fetch 5-day forecast by coordinates
export async function getForecast(lat: number, lon: number): Promise<ForecastDay[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 401) {
        console.error('[WeatherAPI] API key authentication failed for forecast. Status:', response.status);
        throw new Error(USER_FRIENDLY_ERRORS.SERVICE_UNAVAILABLE);
      }
      console.error('[WeatherAPI] getForecast failed. Status:', response.status);
      throw new Error(USER_FRIENDLY_ERRORS.GENERIC_ERROR);
    }
    
    const data: OpenWeatherForecastResponse = await response.json();
    return transformForecast(data);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('[WeatherAPI] Network error:', error);
      throw new Error(USER_FRIENDLY_ERRORS.NETWORK_ERROR);
    }
    if (error instanceof Error && Object.values(USER_FRIENDLY_ERRORS).includes(error.message)) {
      throw error;
    }
    console.error('[WeatherAPI] Unexpected error in getForecast:', error);
    throw new Error(USER_FRIENDLY_ERRORS.GENERIC_ERROR);
  }
}

// Search cities by name (for autocomplete)
export async function searchCities(query: string): Promise<CitySearchResult[]> {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 401) {
        console.error('[WeatherAPI] API key authentication failed for city search. Status:', response.status);
        // Return empty array silently for search - don't show error to user
        return [];
      }
      console.error('[WeatherAPI] searchCities failed. Status:', response.status);
      return [];
    }
    
    const data: OpenWeatherGeoResponse[] = await response.json();
    
    return data.map((item) => ({
      name: item.name,
      country: item.country,
      state: item.state,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (error) {
    console.error('[WeatherAPI] Error in searchCities:', error);
    // Return empty array for search errors - don't interrupt user experience
    return [];
  }
}
