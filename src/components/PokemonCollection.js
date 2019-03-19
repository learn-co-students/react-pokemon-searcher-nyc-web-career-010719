import React from 'react'
import PokemonCard from './PokemonCard'

import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {
  render() {
    return (
      <Card.Group itemsPerRow={6}>
        { this.props.pokemon.map( p => {
          return <PokemonCard pokemon={p} key={p.name}/>
        })}
      </Card.Group>
    )
  }
}

export default PokemonCollection
