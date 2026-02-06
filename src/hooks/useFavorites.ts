import { useState, useCallback } from 'react';
import type { CitySearchResult } from '../types/weather';

const FAVORITES_KEY = 'weather_app_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<CitySearchResult[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  });

  const saveToStorage = useCallback((newFavorites: CitySearchResult[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, []);

  const addFavorite = useCallback((city: CitySearchResult) => {
    setFavorites(prev => {
      // Avoid duplicates based on lat/lon (name might be same but coords different, or slightly different name)
      // Actually strictly checking lat/lon is best.
      const exists = prev.some(f => f.lat === city.lat && f.lon === city.lon);
      if (exists) return prev;
      
      const newFavorites = [...prev, city];
      saveToStorage(newFavorites);
      return newFavorites;
    });
  }, [saveToStorage]);

  const removeFavorite = useCallback((city: CitySearchResult) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(f => !(f.lat === city.lat && f.lon === city.lon));
      saveToStorage(newFavorites);
      return newFavorites;
    });
  }, [saveToStorage]);

  const isFavorite = useCallback((city: CitySearchResult | null) => {
    if (!city) return false;
    return favorites.some(f => f.lat === city.lat && f.lon === city.lon);
  }, [favorites]);

  const toggleFavorite = useCallback((city: CitySearchResult) => {
    if (isFavorite(city)) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
