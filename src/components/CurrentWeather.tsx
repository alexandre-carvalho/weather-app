import { MapPin, Star } from 'lucide-react';
import type { WeatherData } from '../types/weather';
import { formatTemperature, capitalizeWords, getWeatherIconUrl } from '../utils';

interface CurrentWeatherProps {
  weather: WeatherData;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function CurrentWeather({ weather, isFavorite, onToggleFavorite }: CurrentWeatherProps) {
  return (
    <div className="text-center animate-fade-in relative">
      {/* Location */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <MapPin className="w-5 h-5 text-slate-600 dark:text-white" />
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white text-shadow">
          {weather.city}, {weather.country}
        </h1>
        <button
          onClick={onToggleFavorite}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ml-1"
          title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Star 
            className={`w-5 h-5 ${isFavorite ? 'text-amber-400 fill-amber-400' : 'text-slate-400 dark:text-slate-500'}`} 
          />
        </button>
      </div>

      {/* Weather Icon and Temperature */}
      <div className="flex flex-col items-center my-4">
        <img 
          src={getWeatherIconUrl(weather.icon)} 
          alt={weather.description}
          className="w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl"
        />
        <div className="text-7xl md:text-8xl font-light text-slate-800 dark:text-white text-shadow-lg">
          {formatTemperature(weather.temperature)}
        </div>
      </div>

      {/* Description */}
      <p className="text-xl md:text-2xl capitalize text-slate-600 dark:text-white/90 text-shadow">
        {capitalizeWords(weather.description)}
      </p>

      {/* Min/Max */}
      <div className="flex justify-center gap-4 mt-2 text-lg">
        <span className="text-slate-500 dark:text-white/80">
          Mín: <span className="font-medium text-slate-700 dark:text-white">{formatTemperature(weather.tempMin)}</span>
        </span>
        <span className="text-slate-500 dark:text-white/80">
          Máx: <span className="font-medium text-slate-700 dark:text-white">{formatTemperature(weather.tempMax)}</span>
        </span>
      </div>
    </div>
  );
}
