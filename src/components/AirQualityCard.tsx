import { Wind } from 'lucide-react';
import type { AirQualityData } from '../types/weather';
import { getAQIColor, getAQIHealthMessage } from '../utils/airQualityUtils';

interface AirQualityCardProps {
  data: AirQualityData;
}

export function AirQualityCard({ data }: AirQualityCardProps) {
  const { aqi, quality, components, mainPollutant } = data;

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Wind className="w-5 h-5 text-slate-600 dark:text-white/80" />
        <h2 className="text-slate-700 dark:text-white/90 font-medium text-lg">Qualidade do Ar</h2>
      </div>

      {/* Card */}
      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-white/10">
        {/* AQI Badge */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-sm text-slate-600 dark:text-white/60 mb-1">Índice AQI</div>
            <div className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${getAQIColor(aqi)}`}>
              {aqi} - {quality}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600 dark:text-white/60 mb-1">Poluente Principal</div>
            <div className="font-semibold text-slate-800 dark:text-white">{mainPollutant}</div>
          </div>
        </div>

        {/* Health Message */}
        <div className="mb-4 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
          <p className="text-sm text-slate-700 dark:text-white/70">
            {getAQIHealthMessage(aqi)}
          </p>
        </div>

        {/* Pollutant Details */}
        <div className="grid grid-cols-2 gap-3">
          <PollutantItem label="PM2.5" value={components.pm2_5.toFixed(1)} unit="μg/m³" />
          <PollutantItem label="PM10" value={components.pm10.toFixed(1)} unit="μg/m³" />
          <PollutantItem label="O₃" value={components.o3.toFixed(1)} unit="μg/m³" />
          <PollutantItem label="NO₂" value={components.no2.toFixed(1)} unit="μg/m³" />
          <PollutantItem label="SO₂" value={components.so2.toFixed(1)} unit="μg/m³" />
          <PollutantItem label="CO" value={(components.co / 1000).toFixed(2)} unit="mg/m³" />
        </div>
      </div>
    </div>
  );
}

interface PollutantItemProps {
  label: string;
  value: string;
  unit: string;
}

function PollutantItem({ label, value, unit }: PollutantItemProps) {
  return (
    <div className="bg-white/30 dark:bg-black/10 rounded-lg p-2">
      <div className="text-xs text-slate-600 dark:text-white/60 mb-1">{label}</div>
      <div className="font-semibold text-slate-800 dark:text-white">
        {value} <span className="text-xs font-normal text-slate-600 dark:text-white/60">{unit}</span>
      </div>
    </div>
  );
}
