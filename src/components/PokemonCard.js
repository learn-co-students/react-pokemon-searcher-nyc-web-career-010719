import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    front: true
  }

  handleClick = () => {
    this.setState({front: !this.state.front})
  }

  togglePic = () => {
    if (this.state.front === true) {
      return <img src={this.props.pokemon.sprites.front} alt="pokemon" />
    } else {
      return <img src={this.props.pokemon.sprites.back} alt="pokemon" />
    }
  }

  render() {
    return (
      <Card>
        <div >
          <div className="image" onClick={this.handleClick}>
            {this.togglePic()}
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats[this.props.pokemon.stats.length-1].value}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
