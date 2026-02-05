import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders geolocation error correctly', () => {
    render(<ErrorMessage type="geolocation" message="Location access denied" />);
    expect(screen.getByText('Location access denied')).toBeInTheDocument();
  });

  it('renders api error correctly', () => {
    render(<ErrorMessage type="api" message="API Error" />);
    expect(screen.getByText('API Error')).toBeInTheDocument();
  });

  it('renders retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(<ErrorMessage type="network" message="Network Error" onRetry={onRetry} />);
    
    const button = screen.getByRole('button', { name: /tentar novamente/i });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render retry button when onRetry is missing', () => {
    render(<ErrorMessage type="network" message="Network Error" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
