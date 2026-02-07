import { describe, it, expect } from 'vitest';
import {
  getAQIQuality,
  getAQIColor,
  getAQIHealthMessage,
  getMainPollutant,
} from '../airQualityUtils';
import type { AirQualityComponents } from '../../types/weather';

describe('airQualityUtils', () => {
  describe('getAQIQuality', () => {
    it('should return correct quality for each AQI level', () => {
      expect(getAQIQuality(1)).toBe('Good');
      expect(getAQIQuality(2)).toBe('Fair');
      expect(getAQIQuality(3)).toBe('Moderate');
      expect(getAQIQuality(4)).toBe('Poor');
      expect(getAQIQuality(5)).toBe('Very Poor');
    });
  });

  describe('getAQIColor', () => {
    it('should return green color classes for good air quality', () => {
      const color = getAQIColor(1);
      expect(color).toContain('green');
    });

    it('should return yellow color classes for moderate air quality', () => {
      const color = getAQIColor(3);
      expect(color).toContain('yellow');
    });

    it('should return red color classes for very poor air quality', () => {
      const color = getAQIColor(5);
      expect(color).toContain('red');
    });
  });

  describe('getAQIHealthMessage', () => {
    it('should return positive message for good air quality', () => {
      const message = getAQIHealthMessage(1);
      expect(message).toBe('Qualidade do ar é considerada satisfatória.');
    });

    it('should return warning message for poor air quality', () => {
      const message = getAQIHealthMessage(4);
      expect(message).toBe('Todos podem começar a sentir efeitos na saúde.');
    });

    it('should return alert message for very poor air quality', () => {
      const message = getAQIHealthMessage(5);
      expect(message).toBe('Alerta de saúde: todos podem sentir efeitos graves.');
    });
  });

  describe('getMainPollutant', () => {
    it('should identify PM2.5 as main pollutant when highest', () => {
      const components: AirQualityComponents = {
        co: 100,
        no: 1,
        no2: 5,
        o3: 50,
        so2: 2,
        pm2_5: 150,
        pm10: 80,
        nh3: 1,
      };
      expect(getMainPollutant(components)).toBe('PM2.5');
    });

    it('should identify O₃ as main pollutant when highest', () => {
      const components: AirQualityComponents = {
        co: 100,
        no: 1,
        no2: 5,
        o3: 200,
        so2: 2,
        pm2_5: 50,
        pm10: 80,
        nh3: 1,
      };
      expect(getMainPollutant(components)).toBe('O₃');
    });

    it('should identify CO as main pollutant when highest', () => {
      const components: AirQualityComponents = {
        co: 500,
        no: 1,
        no2: 5,
        o3: 50,
        so2: 2,
        pm2_5: 50,
        pm10: 80,
        nh3: 1,
      };
      expect(getMainPollutant(components)).toBe('CO');
    });

    it('should default to PM2.5 when all values are equal', () => {
      const components: AirQualityComponents = {
        co: 10,
        no: 10,
        no2: 10,
        o3: 10,
        so2: 10,
        pm2_5: 10,
        pm10: 10,
        nh3: 10,
      };
      expect(getMainPollutant(components)).toBe('PM2.5');
    });
  });
});
