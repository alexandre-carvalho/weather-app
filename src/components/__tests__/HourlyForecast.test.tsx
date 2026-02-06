import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HourlyForecast } from '../HourlyForecast';
import type { HourlyForecast as HourlyForecastType } from '../../types/weather';

const mockForecasts: HourlyForecastType[] = [
  {
    dt: 1712345600,
    time: '09:00',
    temp: 22,
    icon: '01d',
    description: 'céu limpo',
    condition: 'clear',
  },
  {
    dt: 1712356400,
    time: '12:00',
    temp: 25,
    icon: '02d',
    description: 'algumas nuvens',
    condition: 'clouds',
  },
];

describe('HourlyForecast Component', () => {
  it('renders nothing when empty list is passed', () => {
    const { container } = render(<HourlyForecast forecasts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders forecast items correctly', () => {
    render(<HourlyForecast forecasts={mockForecasts} />);

    expect(screen.getByText('Previsão nas próximas 24h')).toBeInTheDocument();
    
    // Check first item
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('22°')).toBeInTheDocument();
    
    // Check second item
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('25°')).toBeInTheDocument();
  });

  it('renders correct icons', () => {
    render(<HourlyForecast forecasts={mockForecasts} />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'céu limpo');
    expect(images[1]).toHaveAttribute('alt', 'algumas nuvens');
  });
});
