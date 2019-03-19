import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    pokemonUrl: false
  }

  toggleImage = (e) => {
    this.setState({pokemonUrl: !this.state.pokemonUrl}, () => console.log(this.state))
  }

  render() {
    const hp = this.props.pokemon.stats.find(s => s.name === 'hp').value
    return (
      <Card>
        <div>
          <div className="image">
            <img onClick={this.toggleImage} src={this.state.pokemonUrl ? this.props.pokemon.sprites.back : this.props.pokemon.sprites.front} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
