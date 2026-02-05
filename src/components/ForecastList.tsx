import { CalendarDays } from 'lucide-react';
import type { ForecastDay } from '../types/weather';
import { ForecastCard } from './ForecastCard';

interface ForecastListProps {
  forecasts: ForecastDay[];
}

export function ForecastList({ forecasts }: ForecastListProps) {
  if (forecasts.length === 0) return null;

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-slate-600 dark:text-white/80" />
        <h2 className="text-slate-700 dark:text-white/90 font-medium text-lg">Próximos 5 dias</h2>
      </div>

      {/* Forecast Cards - Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {forecasts.map((forecast) => (
          <ForecastCard key={forecast.dateString} forecast={forecast} />
        ))}
      </div>
    </div>
  );
}
