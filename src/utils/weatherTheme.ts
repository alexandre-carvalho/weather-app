import type { WeatherCondition, WeatherTheme } from '../types/weather';

// Get Tailwind gradient class based on weather condition and day/night
export function getWeatherTheme(condition: WeatherCondition, isDay: boolean): WeatherTheme {
  if (!isDay) {
    // Night themes
    switch (condition) {
      case 'clear':
        return 'gradient-clear-night';
      case 'thunderstorm':
        return 'gradient-storm';
      case 'snow':
        return 'gradient-snow';
      default:
        return 'gradient-clear-night';
    }
  }

  // Day themes
  switch (condition) {
    case 'clear':
      return 'gradient-clear-day';
    case 'clouds':
      return 'gradient-cloudy';
    case 'rain':
    case 'drizzle':
      return 'gradient-rainy';
    case 'snow':
      return 'gradient-snow';
    case 'thunderstorm':
      return 'gradient-storm';
    case 'mist':
    case 'fog':
    case 'haze':
      return 'gradient-mist';
    default:
      return 'gradient-clear-day';
  }
}

// Get weather icon URL from OpenWeatherMap
export function getWeatherIconUrl(icon: string, size: '2x' | '4x' = '4x'): string {
  return `https://openweathermap.org/img/wn/${icon}@${size}.png`;
}

// Get text color based on theme (for contrast)
export function getTextColor(theme: WeatherTheme): string {
  const darkThemes: WeatherTheme[] = ['gradient-clear-night', 'gradient-storm', 'gradient-rainy'];
  return darkThemes.includes(theme) ? 'text-white' : 'text-gray-800';
}
