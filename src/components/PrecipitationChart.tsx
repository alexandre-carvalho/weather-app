import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CloudRain } from 'lucide-react';
import type { HourlyForecast } from '../types/weather';

interface PrecipitationChartProps {
  forecasts: HourlyForecast[];
}

// Estimate precipitation probability based on weather condition
function getPrecipitationProbability(condition: string): number {
  const probabilityMap: Record<string, number> = {
    'clear': 0,
    'clouds': 20,
    'mist': 30,
    'fog': 30,
    'haze': 25,
    'drizzle': 60,
    'rain': 85,
    'snow': 90,
    'thunderstorm': 95,
  };
  return probabilityMap[condition] || 10;
}

export function PrecipitationChart({ forecasts }: PrecipitationChartProps) {
  if (forecasts.length === 0) return null;

  const chartData = forecasts.map(forecast => ({
    time: forecast.time,
    probability: getPrecipitationProbability(forecast.condition),
  }));

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CloudRain className="w-5 h-5 text-slate-600 dark:text-white/80" />
        <h2 className="text-slate-700 dark:text-white/90 font-medium text-lg">Probabilidade de Chuva</h2>
      </div>

      {/* Chart */}
      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-white/10">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b"
              style={{ fontSize: '11px' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => value ? [`${value}%`, 'Probabilidade'] : ['', 'Probabilidade']}
            />
            <Bar 
              dataKey="probability" 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
