import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import CardList from './CardList';
import type { Pokemon } from '../../../types/types';

describe('CardList Component', () => {
  const mockPokemons: Pokemon[] = [
    {
      id: '1',
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
  ];

  test('Renders correct number of items when data is provided', () => {
    render(<CardList pokemons={mockPokemons} />);

    const rows = screen.getAllByRole('row');

    expect(screen.getByText('bulbasaur')).toBeTruthy();
    expect(rows).toHaveLength(2);
  });
});
