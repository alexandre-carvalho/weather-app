import { useQuery } from '@tanstack/react-query';
import { getForecast } from '../services/weatherApi';
import type { ForecastDay, HourlyForecast } from '../types/weather';

interface UseForecastOptions {
  latitude: number | null;
  longitude: number | null;
  enabled?: boolean;
}

interface ForecastData {
  daily: ForecastDay[];
  hourly: HourlyForecast[];
}

export function useForecast({ latitude, longitude, enabled = true }: UseForecastOptions) {
  return useQuery<ForecastData, Error>({
    queryKey: ['forecast', latitude, longitude],
    queryFn: () => getForecast(latitude!, longitude!),
    enabled: enabled && latitude !== null && longitude !== null,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
  });
}

