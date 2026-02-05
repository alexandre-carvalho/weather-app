import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather, getCurrentWeatherByCity } from '../services/weatherApi';
import type { WeatherData } from '../types/weather';

interface UseWeatherByCoordinatesOptions {
  latitude: number | null;
  longitude: number | null;
  enabled?: boolean;
}

interface UseWeatherByCityOptions {
  city: string;
  enabled?: boolean;
}

export function useWeatherByCoordinates({ 
  latitude, 
  longitude, 
  enabled = true 
}: UseWeatherByCoordinatesOptions) {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', 'coordinates', latitude, longitude],
    queryFn: () => getCurrentWeather(latitude!, longitude!),
    enabled: enabled && latitude !== null && longitude !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
}

export function useWeatherByCity({ city, enabled = true }: UseWeatherByCityOptions) {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', 'city', city],
    queryFn: () => getCurrentWeatherByCity(city),
    enabled: enabled && city.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
  });
}
