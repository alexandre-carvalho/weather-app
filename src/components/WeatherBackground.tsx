import type { ReactNode } from 'react';
import { useTheme } from '../hooks';

interface WeatherBackgroundProps {
  children: ReactNode;
}

export function WeatherBackground({ children }: WeatherBackgroundProps) {
  const { isDark } = useTheme();
  
  const backgroundClass = isDark 
    ? 'bg-gradient-dark' 
    : 'bg-gradient-light';
  
  return (
    <div 
      className={`min-h-screen ${backgroundClass} transition-all duration-500 ease-in-out`}
    >
      {children}
    </div>
  );
}
