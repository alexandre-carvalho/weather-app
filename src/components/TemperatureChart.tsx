import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { ForecastDay } from '../types/weather';

interface TemperatureChartProps {
  forecasts: ForecastDay[];
}

export function TemperatureChart({ forecasts }: TemperatureChartProps) {
  if (forecasts.length === 0) return null;

  const chartData = forecasts.map(forecast => ({
    day: forecast.dayName,
    max: forecast.tempMax,
    min: forecast.tempMin,
    avg: Math.round((forecast.tempMax + forecast.tempMin) / 2),
  }));

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-slate-600 dark:text-white/80" />
        <h2 className="text-slate-700 dark:text-white/90 font-medium text-lg">Tendência de Temperatura</h2>
      </div>

      {/* Chart */}
      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-white/10">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
            <XAxis 
              dataKey="day" 
              stroke="#64748b"
              style={{ fontSize: '12px', textTransform: 'capitalize' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => value ? [`${value}°C`, ''] : ['', '']}
              labelFormatter={(label) => `${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="max" 
              stroke="#f59e0b" 
              fill="url(#tempGradient)"
              strokeWidth={2}
              name="Máx"
            />
            <Line 
              type="monotone" 
              dataKey="min" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 3 }}
              name="Mín"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
