import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import Search from './Search';
import '@testing-library/jest-dom/vitest';

describe('Rendering Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('Renders search input and search button', () => {
    render(<Search onSearch={() => {}}></Search>);

    expect(
      screen.getByPlaceholderText('Enter the name of the Pokémon...')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('search_input_value', 'Pikachu');

    render(<Search onSearch={() => {}}></Search>);

    const input = screen.getByPlaceholderText(
      'Enter the name of the Pokémon...'
    ) as HTMLInputElement;

    expect(input.value).toBe('Pikachu');
  });
});

describe('User Interaction Tests', () => {
  test('Updates input value when user types', () => {
    render(<Search onSearch={() => {}}></Search>);

    const input = screen.getByPlaceholderText(
      'Enter the name of the Pokémon...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Pikachu' } });

    expect(input.value).toBe('Pikachu');
  });

  test('Saves search term to localStorage when search button is clicked', () => {
    render(<Search onSearch={() => {}}></Search>);

    const input = screen.getByPlaceholderText(
      'Enter the name of the Pokémon...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Pikachu' } });

    const button = screen.getByText('Search') as HTMLInputElement;
    fireEvent.click(button);
    const inputValue = localStorage.getItem('search_input_value');

    expect(inputValue).toBe('Pikachu');
  });

  test('Triggers search callback with correct parameters', () => {
    const onSearchMock = vi.fn();

    render(<Search onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(
      'Enter the name of the Pokémon...'
    ) as HTMLInputElement;
    const button = screen.getByText('Search') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('pikachu');
  });
});

describe('LocalStorage Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Overwrites existing localStorage value when new search is performed', () => {
    const oldTerm = 'Pikachu';
    const newTerm = 'Charizard';
    localStorage.setItem('search_input_value', oldTerm);

    render(<Search onSearch={() => {}} />);

    const input = screen.getByPlaceholderText(
      'Enter the name of the Pokémon...'
    ) as HTMLInputElement;
    const button = screen.getByText('Search') as HTMLInputElement;

    fireEvent.change(input, { target: { value: newTerm } });
    fireEvent.click(button);

    const savedValue = localStorage.getItem('search_input_value');

    expect(savedValue).toBe(newTerm);
    expect(savedValue).not.toBe(oldTerm);
  });
});
