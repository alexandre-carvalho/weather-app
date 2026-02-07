import type { AQILevel, AQIQuality, AirQualityComponents } from '../types/weather';

export function getAQIQuality(aqi: AQILevel): AQIQuality {
  const qualityMap: Record<AQILevel, AQIQuality> = {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor',
  };
  return qualityMap[aqi];
}

export function getAQIColor(aqi: AQILevel): string {
  const colorMap: Record<AQILevel, string> = {
    1: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
    2: 'text-lime-600 dark:text-lime-400 bg-lime-100 dark:bg-lime-900/30',
    3: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30',
    4: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30',
    5: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
  };
  return colorMap[aqi];
}

export function getAQIHealthMessage(aqi: AQILevel): string {
  const messageMap: Record<AQILevel, string> = {
    1: 'Qualidade do ar é considerada satisfatória.',
    2: 'Qualidade do ar é aceitável para a maioria das pessoas.',
    3: 'Pessoas sensíveis podem sentir efeitos na saúde.',
    4: 'Todos podem começar a sentir efeitos na saúde.',
    5: 'Alerta de saúde: todos podem sentir efeitos graves.',
  };
  return messageMap[aqi];
}

export function getMainPollutant(components: AirQualityComponents): string {
  const pollutants = {
    'PM2.5': components.pm2_5,
    'PM10': components.pm10,
    'O₃': components.o3,
    'NO₂': components.no2,
    'SO₂': components.so2,
    'CO': components.co,
  };

  let maxPollutant = 'PM2.5';
  let maxValue = components.pm2_5;

  Object.entries(pollutants).forEach(([name, value]) => {
    if (value > maxValue) {
      maxValue = value;
      maxPollutant = name;
    }
  });

  return maxPollutant;
}
