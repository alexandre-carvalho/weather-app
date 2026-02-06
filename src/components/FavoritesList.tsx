import { Star, X, MapPin } from 'lucide-react';
import type { CitySearchResult } from '../types/weather';

interface FavoritesListProps {
  favorites: CitySearchResult[];
  onSelect: (city: CitySearchResult) => void;
  onRemove: (city: CitySearchResult) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FavoritesList({ favorites, onSelect, onRemove, isOpen, onClose }: FavoritesListProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Favoritos</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
            aria-label="Fechar"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
          {favorites.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              <Star className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
              <p>Nenhuma cidade salva.</p>
              <p className="text-sm mt-1">Clique na estrela para adicionar aos favoritos.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {favorites.map((city, index) => (
                <div 
                  key={`${city.lat}-${city.lon}-${index}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 group transition-colors"
                >
                  <button 
                    onClick={() => {
                      onSelect(city);
                      onClose();
                    }}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <MapPin className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{city.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {city.state ? `${city.state}, ` : ''}{city.country}
                      </p>
                    </div>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(city);
                    }}
                    className="p-2 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remover"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
