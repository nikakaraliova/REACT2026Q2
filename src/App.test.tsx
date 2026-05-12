import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import App from './App';
import '@testing-library/jest-dom/vitest';

const createMockFetchResponse = (
  data: unknown,
  ok = true
): Promise<Response> => {
  return Promise.resolve({
    ok,
    status: ok ? 200 : 404,
    json: () => Promise.resolve(data),
    headers: new Headers(),
    type: 'basic',
    url: '',
  } as Response);
};

describe('App Component Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.stubGlobal('fetch', vi.fn());
  });

  test('Renders and fetches default list on mount', async () => {
    const mockListData = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };

    vi.mocked(fetch).mockImplementation(() =>
      createMockFetchResponse(mockListData)
    );

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('ivysaur')).toBeInTheDocument();
    });
  });

  test('Performs search and updates UI with single pokemon data', async () => {
    vi.mocked(fetch).mockImplementationOnce(() =>
      createMockFetchResponse({ results: [] })
    );

    const mockPikachu = { name: 'pikachu', id: 25 };
    vi.mocked(fetch).mockImplementationOnce(() =>
      createMockFetchResponse(mockPikachu)
    );

    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('pokemon/pikachu')
    );
  });

  test('Handles API error correctly', async () => {
    vi.mocked(fetch).mockImplementation(() =>
      createMockFetchResponse({}, false)
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/no pokemons!/i)).toBeInTheDocument();
    });
  });

  test('Initializes search from localStorage', async () => {
    const savedTerm = 'mew';
    localStorage.setItem('search_input_value', savedTerm);

    vi.mocked(fetch).mockImplementation(() =>
      createMockFetchResponse({ name: 'mew', id: 151 })
    );

    render(<App />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining(savedTerm));
      expect(screen.getByText('mew')).toBeInTheDocument();
    });
  });
});
