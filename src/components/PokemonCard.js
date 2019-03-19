import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    toggleImage: false
  }

  handleClick = () => {
    this.setState({toggleImage: !this.state.toggleImage})
  }

  pokemonImage = () => {
    if (this.state.toggleImage) {
      return this.props.pokemon.sprites.back
    } else {
      return this.props.pokemon.sprites.front
    }
  }

  render() {
    return (
      <Card>
        <div>
          <div className="image">
            <img onClick={this.handleClick} src={this.pokemonImage()} alt={this.props.pokemon.name} />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats.find(stat => stat.name === 'hp').value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
