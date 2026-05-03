import React, { type ReactNode } from 'react';
import type { Pokemon } from '../../../types/pokemon';

type CardProps = {
  pokemon: Pokemon;
};

export default class Card extends React.Component<CardProps> {
  render(): ReactNode {
    const { pokemon } = this.props;
    console.log(pokemon);
    return (
      <tr>
        <td>{pokemon.name}</td>
        <td>
          <a href={pokemon.url} target="_blank">
            more info about {pokemon.name}
          </a>
        </td>
      </tr>
    );
  }
}
