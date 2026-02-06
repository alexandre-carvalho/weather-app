import { Clock } from 'lucide-react';
import type { HourlyForecast as HourlyForecastType } from '../types/weather';
import { formatTemperature, getWeatherIconUrl } from '../utils';

interface HourlyForecastProps {
  forecasts: HourlyForecastType[];
}

export function HourlyForecast({ forecasts }: HourlyForecastProps) {
  if (forecasts.length === 0) return null;

  return (
    <div className="animate-slide-up mb-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-slate-600 dark:text-white/80" />
        <h2 className="text-slate-700 dark:text-white/90 font-medium text-lg">Previsão nas próximas 24h</h2>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {forecasts.map((forecast) => (
          <div 
            key={forecast.dt}
            className="flex flex-col items-center min-w-[80px] p-3 rounded-2xl bg-white/40 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-white/50 dark:hover:bg-black/30 transition-colors"
          >
            <span className="text-slate-600 dark:text-white/80 text-sm font-medium">
              {forecast.time}
            </span>
            <img 
              src={getWeatherIconUrl(forecast.icon)} 
              alt={forecast.description}
              className="w-12 h-12 my-2 drop-shadow-md"
            />
            <span className="text-slate-800 dark:text-white font-bold text-lg">
              {formatTemperature(forecast.temp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
