import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFavorites } from '../useFavorites';
import type { CitySearchResult } from '../../types/weather';

const mockCity: CitySearchResult = {
  name: 'São Paulo',
  country: 'BR',
  lat: -23.55,
  lon: -46.63,
  state: 'SP',
};



describe('useFavorites Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('should add a favorite', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(mockCity);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toEqual(mockCity);
    expect(result.current.isFavorite(mockCity)).toBe(true);
  });

  it('should remove a favorite', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(mockCity);
    });
    expect(result.current.favorites).toHaveLength(1);

    act(() => {
      result.current.removeFavorite(mockCity);
    });
    expect(result.current.favorites).toHaveLength(0);
    expect(result.current.isFavorite(mockCity)).toBe(false);
  });

  it('should toggle favorite', () => {
    const { result } = renderHook(() => useFavorites());

    // Add
    act(() => {
      result.current.toggleFavorite(mockCity);
    });
    expect(result.current.isFavorite(mockCity)).toBe(true);

    // Remove
    act(() => {
      result.current.toggleFavorite(mockCity);
    });
    expect(result.current.isFavorite(mockCity)).toBe(false);
  });

  it('should persist to localStorage', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(mockCity);
    });

    const stored = JSON.parse(localStorage.getItem('weather_app_favorites') || '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('São Paulo');
  });

  it('should load from localStorage on init', () => {
    localStorage.setItem('weather_app_favorites', JSON.stringify([mockCity]));
    
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toEqual(mockCity);
  });

  it('should not add duplicates', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(mockCity);
      result.current.addFavorite(mockCity); // Try adding again
    });

    expect(result.current.favorites).toHaveLength(1);
  });
});
