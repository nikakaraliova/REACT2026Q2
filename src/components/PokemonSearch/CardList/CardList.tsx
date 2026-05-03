import type { Pokemon } from '../../../types/pokemon';
import React, { type ReactNode } from 'react';
import Card from '../Card/Card';
import './CardList.css';

type CardListProps = {
  pokemons: Pokemon[];
};

export default class CardList extends React.Component<CardListProps, {}> {
  checkPokemons = () => {
    return this.props.pokemons?.map((pokemon) => (
      <Card key={pokemon.name} pokemon={pokemon} />
    ));
  };

  render(): ReactNode {
    return (
      <div className="results-section">
        <table className="pokemon-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Description</th>
            </tr>
          </thead>
          <tbody>{this.checkPokemons()}</tbody>
        </table>
      </div>
    );
  }
}
