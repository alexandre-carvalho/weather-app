import { useQuery } from '@tanstack/react-query';
import { searchCities } from '../services/weatherApi';
import { useDebounce } from './useDebounce';
import type { CitySearchResult } from '../types/weather';

interface UseCitySearchOptions {
  query: string;
  enabled?: boolean;
  debounceMs?: number;
}

export function useCitySearch({ 
  query, 
  enabled = true, 
  debounceMs = 300 
}: UseCitySearchOptions) {
  const debouncedQuery = useDebounce(query, debounceMs);
  
  return useQuery<CitySearchResult[], Error>({
    queryKey: ['cities', debouncedQuery],
    queryFn: () => searchCities(debouncedQuery),
    enabled: enabled && debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}
