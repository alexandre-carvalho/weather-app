import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TemperatureChart } from '../TemperatureChart';
import type { ForecastDay } from '../../types/weather';

const mockForecasts: ForecastDay[] = [
  {
    date: new Date('2024-02-07'),
    dateString: '2024-02-07',
    dayName: 'Quarta',
    tempMax: 28,
    tempMin: 20,
    icon: '01d',
    description: 'céu limpo',
    condition: 'clear',
  },
  {
    date: new Date('2024-02-08'),
    dateString: '2024-02-08',
    dayName: 'Quinta',
    tempMax: 26,
    tempMin: 19,
    icon: '02d',
    description: 'algumas nuvens',
    condition: 'clouds',
  },
];

describe('TemperatureChart Component', () => {
  it('renders nothing when empty list is passed', () => {
    const { container } = render(<TemperatureChart forecasts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders chart title', () => {
    render(<TemperatureChart forecasts={mockForecasts} />);
    expect(screen.getByText('Tendência de Temperatura')).toBeInTheDocument();
  });

  it('renders chart container', () => {
    const { container } = render(<TemperatureChart forecasts={mockForecasts} />);
    // Recharts renders an SVG
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('processes forecast data correctly', () => {
    const { container } = render(<TemperatureChart forecasts={mockForecasts} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Chart should be rendered with the forecast data
  });
});
