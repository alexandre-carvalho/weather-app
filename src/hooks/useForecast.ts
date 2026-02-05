import { useQuery } from '@tanstack/react-query';
import { getForecast } from '../services/weatherApi';
import type { ForecastDay } from '../types/weather';

interface UseForecastOptions {
  latitude: number | null;
  longitude: number | null;
  enabled?: boolean;
}

export function useForecast({ latitude, longitude, enabled = true }: UseForecastOptions) {
  return useQuery<ForecastDay[], Error>({
    queryKey: ['forecast', latitude, longitude],
    queryFn: () => getForecast(latitude!, longitude!),
    enabled: enabled && latitude !== null && longitude !== null,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
  });
}
