import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FavoritesList } from '../FavoritesList';
import type { CitySearchResult } from '../../types/weather';

const mockFavorites: CitySearchResult[] = [
  {
    name: 'London',
    country: 'GB',
    lat: 51.50,
    lon: -0.12,
  },
  {
    name: 'Paris',
    country: 'FR',
    lat: 48.85,
    lon: 2.35,
  }
];

describe('FavoritesList Component', () => {
  const mockOnSelect = vi.fn();
  const mockOnRemove = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    render(
      <FavoritesList 
        isOpen={false} 
        favorites={[]} 
        onSelect={mockOnSelect} 
        onRemove={mockOnRemove}
        onClose={mockOnClose}
      />
    );
    expect(screen.queryByText('Favoritos')).not.toBeInTheDocument();
  });

  it('should render correct number of favorites', () => {
    render(
      <FavoritesList 
        isOpen={true} 
        favorites={mockFavorites} 
        onSelect={mockOnSelect} 
        onRemove={mockOnRemove}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Remover/i })).toHaveLength(2); // Remove buttons
  });

  it('should render empty state message', () => {
    render(
      <FavoritesList 
        isOpen={true} 
        favorites={[]} 
        onSelect={mockOnSelect} 
        onRemove={mockOnRemove}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Nenhuma cidade salva.')).toBeInTheDocument();
  });

  it('should call onSelect when a city is clicked', () => {
    render(
      <FavoritesList 
        isOpen={true} 
        favorites={mockFavorites} 
        onSelect={mockOnSelect} 
        onRemove={mockOnRemove}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByText('London'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockFavorites[0]);
    expect(mockOnClose).toHaveBeenCalled(); // Should close modal on select
  });

  it('should call onRemove when remove button is clicked', () => {
    render(
      <FavoritesList 
        isOpen={true} 
        favorites={mockFavorites} 
        onSelect={mockOnSelect} 
        onRemove={mockOnRemove}
        onClose={mockOnClose}
      />
    );

    // Get the remove button for the first item (London)
    const removeButtons = screen.getAllByTitle('Remover');
    fireEvent.click(removeButtons[0]);

    expect(mockOnRemove).toHaveBeenCalledWith(mockFavorites[0]);
    // Should NOT simulate calling onSelect because of stopPropagation
    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('should close when close button is clicked', () => {
    render(
      <FavoritesList 
        isOpen={true} 
        favorites={mockFavorites} 
        onSelect={mockOnSelect} 
        onRemove={mockOnRemove}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByTitle('Fechar'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
