import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-white"
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 dark:text-white" />
      )}
      <span className="text-sm font-medium hidden sm:inline">Tema</span>
    </button>
  );
}
