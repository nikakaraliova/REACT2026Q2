import React, { type ReactNode } from 'react';
import Search from './components/PokemonSearch/Search/Search';
import CardList from './components/PokemonSearch/CardList/CardList';
import ErrorButton from './components/PokemonSearch/ErrorButton/ErrorButton';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import type { AppState } from './types/types';
import './App.css';

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      pokemons: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    const inputValue = localStorage.getItem('search_input_value') || '';
    this.handleSearch(inputValue);
  }

  handleSearch = async (inputValue: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const trimmedInputValue = inputValue.trim();
      const url = trimmedInputValue
        ? `https://pokeapi.co/api/v2/pokemon/${trimmedInputValue.toLowerCase()}`
        : `https://pokeapi.co/api/v2/pokemon?limit=20`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('No Pokemons!');
      }

      const data = await response.json();

      let results;
      if (trimmedInputValue) {
        results = [
          {
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
          },
        ];
      } else {
        results = data.results;
      }

      this.setState({ pokemons: results, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, pokemons: [], isLoading: false });
    }
  };

  render(): ReactNode {
    return (
      <ErrorBoundary>
        <div className="app-container">
          <section>
            <Search onSearch={this.handleSearch}></Search>
          </section>

          <section>
            {this.state.isLoading ? <p>Loading...</p> : null}
            {this.state.error ? <p>{this.state.error}</p> : null}
            {!this.state.isLoading && !this.state.error && (
              <CardList pokemons={this.state.pokemons} />
            )}
          </section>
          <section className="error-button-container">
            <ErrorButton></ErrorButton>
          </section>
        </div>
      </ErrorBoundary>
    );
  }
}
