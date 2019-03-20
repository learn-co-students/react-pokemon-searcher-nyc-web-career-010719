import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {

  renderPokemonCard = () => {
    return this.props.pokemon.map(poke => {
      let pokemonHp = poke.stats.find(attr => attr.name === "hp").value
      return <PokemonCard key ={poke.id} pokemonName={poke.name} pokemonHp={pokemonHp} pokemonSpriteFront={poke.sprites.front} pokemonSpriteBack={poke.sprites.back} /> 
    })
  }

  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.renderPokemonCard()}
      </Card.Group>
    )
  }
}

export default PokemonCollection
