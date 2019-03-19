import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    toggleImage: false
  }

  renderHP = () => {
    let hp = this.props.pokemon.stats.find(stat => {
      return stat.name === "hp"
    })
    return hp.value
  }

  renderImage = () => {
    if (this.state.toggleImage) {
      return this.props.pokemon.sprites.back
    }
    else return this.props.pokemon.sprites.front
  }

  handleClick = (e) => {
    this.setState((prevState) => ({
      toggleImage: !prevState.toggleImage
    }))
  }

  render() {
    return (
      <Card onClick={this.handleClick}>
        <div>
          <div className="image">
            <img src={this.renderImage()} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
                {this.renderHP()}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
