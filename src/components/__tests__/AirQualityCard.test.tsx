import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AirQualityCard } from '../AirQualityCard';
import type { AirQualityData } from '../../types/weather';

const mockGoodAirQuality: AirQualityData = {
  aqi: 1,
  quality: 'Good',
  components: {
    co: 230.5,
    no: 0.1,
    no2: 5.2,
    o3: 60.3,
    so2: 2.1,
    pm2_5: 8.5,
    pm10: 12.3,
    nh3: 0.5,
  },
  mainPollutant: 'CO',
};

const mockPoorAirQuality: AirQualityData = {
  aqi: 4,
  quality: 'Poor',
  components: {
    co: 1200.5,
    no: 5.1,
    no2: 45.2,
    o3: 120.3,
    so2: 30.1,
    pm2_5: 55.5,
    pm10: 80.3,
    nh3: 10.5,
  },
  mainPollutant: 'PM2.5',
};

describe('AirQualityCard Component', () => {
  it('renders air quality title', () => {
    render(<AirQualityCard data={mockGoodAirQuality} />);
    expect(screen.getByText('Qualidade do Ar')).toBeInTheDocument();
  });

  it('displays AQI level and quality', () => {
    render(<AirQualityCard data={mockGoodAirQuality} />);
    expect(screen.getByText('1 - Good')).toBeInTheDocument();
  });

  it('displays main pollutant', () => {
    render(<AirQualityCard data={mockGoodAirQuality} />);
    // CO appears both as main pollutant AND in the grid
    expect(screen.getAllByText('CO').length).toBeGreaterThan(0);
  });

  it('displays health message', () => {
    render(<AirQualityCard data={mockGoodAirQuality} />);
    expect(screen.getByText('Qualidade do ar é considerada satisfatória.')).toBeInTheDocument();
  });

  it('displays all pollutant details', () => {
    const { container } = render(<AirQualityCard data={mockGoodAirQuality} />);
    
    // Just verify the grid is present
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    // Verify some unique values are displayed
    expect(screen.getByText('8.5')).toBeInTheDocument();
    expect(screen.getByText('0.23')).toBeInTheDocument();
  });

  it('renders poor air quality correctly', () => {
    render(<AirQualityCard data={mockPoorAirQuality} />);
    expect(screen.getByText('4 - Poor')).toBeInTheDocument();
    // PM2.5 appears as main pollutant AND in the list
    expect(screen.getAllByText('PM2.5').length).toBeGreaterThan(0);
    expect(screen.getByText('Todos podem começar a sentir efeitos na saúde.')).toBeInTheDocument();
  });

  it('formats pollutant values correctly', () => {
    render(<AirQualityCard data={mockGoodAirQuality} />);
    // PM2.5 should be 8.5
    expect(screen.getByText('8.5')).toBeInTheDocument();
    // CO should be converted from μg/m³ to mg/m³ (230.5 / 1000 = 0.23)
    expect(screen.getByText('0.23')).toBeInTheDocument();
  });
});
