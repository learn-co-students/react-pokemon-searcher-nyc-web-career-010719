import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    imageClicked: true
  }

  handleSpriteClick = () => {
    this.setState(prevState => ({ imageClicked: !prevState.imageClicked }))
  }

  render() {
    return (
      <Card>
        <div>
          <div className="image" onClick={() => this.handleSpriteClick()}>
            <img src={this.state.imageClicked ? this.props.pokemonSpriteFront : this.props.pokemonSpriteBack} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemonName}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemonHp} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
