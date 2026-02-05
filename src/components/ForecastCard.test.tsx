import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ForecastCard } from './ForecastCard';
import type { ForecastDay } from '../types/weather';

const mockForecast: ForecastDay = {
  date: new Date('2023-10-02'),
  dateString: '2023-10-02',
  dayName: 'Seg',
  tempMin: 18,
  tempMax: 26,
  icon: '01d',
  description: 'céu limpo',
  condition: 'clear',
};

describe('ForecastCard', () => {
  it('renders forecast information correctly', () => {
    render(<ForecastCard forecast={mockForecast} />);
    
    // Check day name
    expect(screen.getByText('Seg')).toBeInTheDocument();
    
    // Check temperatures
    expect(screen.getByText('26°')).toBeInTheDocument();
    expect(screen.getByText('18°')).toBeInTheDocument();
    
    // Check description (it might be hidden on mobile but present in DOM)
    expect(screen.getByText('Céu Limpo')).toBeInTheDocument();
  });

  it('renders weather icon with correct src', () => {
    render(<ForecastCard forecast={mockForecast} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'céu limpo');
    expect(img).toHaveAttribute('src', expect.stringContaining('01d'));
  });
});
