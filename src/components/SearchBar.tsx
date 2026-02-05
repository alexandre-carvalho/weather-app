import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { useCitySearch } from '../hooks';
import type { CitySearchResult } from '../types/weather';

interface SearchBarProps {
  onCitySelect: (city: CitySearchResult) => void;
  onUseCurrentLocation: () => void;
}

export function SearchBar({ onCitySelect, onUseCurrentLocation }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: cities, isLoading } = useCitySearch({ 
    query,
    enabled: query.length >= 2 
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Open dropdown when cities are available
  useEffect(() => {
    if (cities && cities.length > 0) {
      setIsOpen(true);
    }
  }, [cities]);

  const handleSelect = (city: CitySearchResult) => {
    onCitySelect(city);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-300" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => cities && cities.length > 0 && setIsOpen(true)}
          placeholder="Buscar cidade..."
          className="w-full pl-12 pr-20 py-3 
                     bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-full
                     border border-gray-200/50 dark:border-slate-600/50 
                     text-slate-800 dark:text-white 
                     placeholder-slate-400 dark:placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-500 
                     focus:border-transparent
                     transition-all shadow-lg"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isLoading && (
            <Loader2 className="w-5 h-5 text-slate-400 dark:text-slate-300 animate-spin" />
          )}
          {query && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-200/50 dark:hover:bg-slate-600/50 rounded-full transition-colors"
              aria-label="Limpar busca"
            >
              <X className="w-5 h-5 text-slate-400 dark:text-slate-300" />
            </button>
          )}
          <button
            onClick={onUseCurrentLocation}
            className="p-2 hover:bg-gray-200/50 dark:hover:bg-slate-600/50 rounded-full transition-colors"
            title="Usar minha localização"
            aria-label="Usar minha localização"
          >
            <MapPin className="w-5 h-5 text-slate-400 dark:text-slate-300" />
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && cities && cities.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute top-full mt-2 w-full 
                     bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg rounded-2xl 
                     border border-gray-200/50 dark:border-slate-600/50 
                     shadow-xl overflow-hidden z-50 animate-slide-up"
        >
          {cities.map((city, index) => (
            <button
              key={`${city.lat}-${city.lon}-${index}`}
              onClick={() => handleSelect(city)}
              className="w-full px-4 py-3 text-left 
                         hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors
                         flex items-center gap-3 
                         text-slate-800 dark:text-white"
            >
              <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-400 flex-shrink-0" />
              <div>
                <span className="font-medium">{city.name}</span>
                {city.state && <span className="text-slate-500 dark:text-slate-400">, {city.state}</span>}
                <span className="text-slate-400 dark:text-slate-500 ml-1">({city.country})</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
