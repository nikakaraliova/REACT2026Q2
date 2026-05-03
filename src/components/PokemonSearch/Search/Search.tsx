import React, { type ReactNode } from 'react';
import './Search.css';
import type { SearchProps, SearchState } from '../../../types/types';

export default class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      searchInputValue: localStorage.getItem('search_input_value') || '',
    };
  }

  changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ searchInputValue: e.target.value });

  searchData = () => {
    localStorage.setItem('search_input_value', this.state.searchInputValue);
    this.props.onSearch(this.state.searchInputValue);
  };

  render(): ReactNode {
    return (
      <section className="search-section">
        <input
          type="text"
          value={this.state.searchInputValue}
          onChange={this.changeInputValue}
          placeholder="Enter the name of the Pokémon..."
        />
        <button className="pokemon-button" onClick={this.searchData}>
          Search
        </button>
      </section>
    );
  }
}
