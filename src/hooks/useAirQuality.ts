import { useQuery } from '@tanstack/react-query';
import { getAirQuality } from '../services/weatherApi';
import type { AirQualityData } from '../types/weather';

interface UseAirQualityOptions {
  latitude: number | null;
  longitude: number | null;
  enabled?: boolean;
}

export function useAirQuality({ latitude, longitude, enabled = true }: UseAirQualityOptions) {
  return useQuery<AirQualityData, Error>({
    queryKey: ['airQuality', latitude, longitude],
    queryFn: () => getAirQuality(latitude!, longitude!),
    enabled: enabled && latitude !== null && longitude !== null,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}
