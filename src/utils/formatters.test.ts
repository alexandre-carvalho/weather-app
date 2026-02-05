import { describe, it, expect } from 'vitest';
import { 
  formatTemperature, 
  formatWindSpeed, 
  formatHumidity, 
  formatVisibility, 
  capitalizeWords,
  getDayName,
  formatShortDate
} from './formatters';

describe('formatters', () => {
  describe('formatTemperature', () => {
    it('formats temperature correctly', () => {
      expect(formatTemperature(25)).toBe('25°');
      expect(formatTemperature(0)).toBe('0°');
      expect(formatTemperature(-5)).toBe('-5°');
    });

    it('rounds temperature correctly', () => {
      expect(formatTemperature(25.6)).toBe('26°');
    });
  });

  describe('formatWindSpeed', () => {
    it('formats wind speed correctly', () => {
      expect(formatWindSpeed(10)).toBe('10 km/h');
    });
  });

  describe('formatHumidity', () => {
    it('formats humidity correctly', () => {
      expect(formatHumidity(50)).toBe('50%');
    });
  });

  describe('formatVisibility', () => {
    it('formats visibility correctly', () => {
      expect(formatVisibility(10)).toBe('10.0 km');
      expect(formatVisibility(5.5)).toBe('5.5 km');
    });
  });

  describe('capitalizeWords', () => {
    it('capitalizes single word', () => {
      expect(capitalizeWords('hello')).toBe('Hello');
    });

    it('capitalizes multiple words', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    it('handles empty string', () => {
      expect(capitalizeWords('')).toBe('');
    });

    it('capitalizes words with accents', () => {
      expect(capitalizeWords('céu limpo')).toBe('Céu Limpo');
      expect(capitalizeWords('manhã ensolarada')).toBe('Manhã Ensolarada');
    });
  });

  describe('getDayName', () => {
    it('returns correct day name', () => {
      const date = new Date('2023-10-01T12:00:00'); // Sunday
      expect(getDayName(date)).toBe('Dom');
    });
  });

  describe('formatShortDate', () => {
    it('formats date to short string', () => {
      const date = new Date('2023-10-01T12:00:00');
      // Note: This relies on locale which might vary in test environment, 
      // but usually defaults to standardized node environment or can be mocked if needed.
      // We'll check if it contains the day and month.
      const formatted = formatShortDate(date);
      expect(formatted).toMatch(/\d{2}\/\d{2}/);
    });
  });
});
