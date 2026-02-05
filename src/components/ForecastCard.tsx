import type { ForecastDay } from '../types/weather';
import { formatTemperature, getWeatherIconUrl, capitalizeWords } from '../utils';

interface ForecastCardProps {
  forecast: ForecastDay;
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="glass-card p-4 min-w-[120px] flex flex-col items-center gap-2 
                    hover:bg-white/80 dark:hover:bg-slate-700/80 
                    transition-all hover:scale-105 cursor-pointer">
      {/* Day Name */}
      <span className="text-slate-700 dark:text-white font-medium capitalize">
        {forecast.dayName}
      </span>

      {/* Weather Icon */}
      <img 
        src={getWeatherIconUrl(forecast.icon, '2x')} 
        alt={forecast.description}
        className="w-12 h-12"
      />

      {/* Temperature Range */}
      <div className="flex gap-2 text-sm">
        <span className="text-slate-800 dark:text-white font-medium">
          {formatTemperature(forecast.tempMax)}
        </span>
        <span className="text-slate-400 dark:text-slate-400">
          {formatTemperature(forecast.tempMin)}
        </span>
      </div>

      {/* Description (hidden on mobile, visible on hover) */}
      <span className="text-slate-500 dark:text-slate-300 text-xs text-center capitalize hidden md:block">
        {capitalizeWords(forecast.description)}
      </span>
    </div>
  );
}
