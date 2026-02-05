import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';
import type { WeatherData } from '../types/weather';
import { formatTemperature, formatWindSpeed, formatHumidity, formatVisibility } from '../utils';

interface WeatherDetailsProps {
  weather: WeatherData;
}

interface DetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function DetailCard({ icon, label, value }: DetailCardProps) {
  return (
    <div className="glass-card p-4 flex flex-col items-center gap-2 
                    hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors">
      <div className="text-slate-500 dark:text-slate-300">{icon}</div>
      <span className="text-slate-500 dark:text-slate-400 text-sm">{label}</span>
      <span className="text-slate-800 dark:text-white font-semibold text-lg">{value}</span>
    </div>
  );
}

export function WeatherDetails({ weather }: WeatherDetailsProps) {
  const details = [
    {
      icon: <Thermometer className="w-6 h-6" />,
      label: 'Sensação',
      value: formatTemperature(weather.feelsLike),
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: 'Umidade',
      value: formatHumidity(weather.humidity),
    },
    {
      icon: <Wind className="w-6 h-6" />,
      label: 'Vento',
      value: formatWindSpeed(weather.windSpeed),
    },
    {
      icon: <Eye className="w-6 h-6" />,
      label: 'Visibilidade',
      value: formatVisibility(weather.visibility),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
      {details.map((detail) => (
        <DetailCard key={detail.label} {...detail} />
      ))}
    </div>
  );
}
