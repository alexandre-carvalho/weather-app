// Format temperature with degree symbol
export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°`;
}

// Format temperature range
export function formatTempRange(min: number, max: number): string {
  return `${formatTemperature(min)} / ${formatTemperature(max)}`;
}

// Format wind speed
export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed)} km/h`;
}

// Format humidity
export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}

// Format visibility
export function formatVisibility(visibility: number): string {
  return `${visibility.toFixed(1)} km`;
}

// Format pressure
export function formatPressure(pressure: number): string {
  return `${pressure} hPa`;
}

// Capitalize first letter of each word
export function capitalizeWords(str: string): string {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Format date to day name
export function getDayName(date: Date): string {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  return days[date.getDay()];
}

// Format date to short format
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}
