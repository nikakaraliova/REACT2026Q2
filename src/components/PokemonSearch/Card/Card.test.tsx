import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Card from './Card';
import type { Pokemon } from '../../../types/types';

describe('Card Component', () => {
  const mockPokemon: Pokemon = {
    id: '1',
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  };

  test('Renders pokemon data correctly', () => {
    render(
      <table>
        <tbody>
          <Card pokemon={mockPokemon} />
        </tbody>
      </table>
    );

    expect(screen.getByText('bulbasaur')).toContain;

    const link = screen.getByRole('link', {
      name: /more info about bulbasaur/i,
    });
    expect(link).toContain;
  });

  test('Contains the correct URL in the link', () => {
    render(
      <table>
        <tbody>
          <Card pokemon={mockPokemon} />
        </tbody>
      </table>
    );

    const link = screen.getByRole('link') as HTMLAnchorElement;

    expect(link.href).toBe(mockPokemon.url);
    expect(link.target).toBe('_blank');
  });
});
