import React, { Component, Fragment } from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends Component {

  renderPokemon = () => {
    let pokes;
    !!this.props.filteredPokemon ?
    pokes = this.props.filteredPokemon :
    pokes = this.props.pokemon

    return pokes.map(p => {
      return (
        <PokemonCard
          key={p.id}
          {...p}
        />
      );
    });
  };

  render() {
    return (
      <Fragment>
        <h1>Hello From Pokemon Collection</h1>
        <Card.Group itemsPerRow={6} >
          {this.renderPokemon()}
        </Card.Group>
      </Fragment>
    );
  };
};

export default PokemonCollection;
