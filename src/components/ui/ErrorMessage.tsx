import { AlertCircle, RefreshCw, MapPinOff } from 'lucide-react';

interface ErrorMessageProps {
  type: 'geolocation' | 'api' | 'not-found' | 'network';
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ type, message, onRetry }: ErrorMessageProps) {
  const getIcon = () => {
    switch (type) {
      case 'geolocation':
        return <MapPinOff className="w-12 h-12" />;
      default:
        return <AlertCircle className="w-12 h-12" />;
    }
  };

  return (
    <div className="glass-card p-6 text-center animate-fade-in">
      <div className="flex justify-center mb-4 text-slate-500 dark:text-slate-300">
        {getIcon()}
      </div>
      <p className="text-slate-700 dark:text-white/90 text-lg mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 
                     bg-slate-200/50 dark:bg-slate-700/50 
                     hover:bg-slate-300/50 dark:hover:bg-slate-600/50 
                     rounded-full transition-colors 
                     text-slate-700 dark:text-white font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Tentar novamente
        </button>
      )}
    </div>
  );
}
