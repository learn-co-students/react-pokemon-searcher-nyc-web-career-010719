import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    url: this.props.pokemon.sprites.front
  }
}

  handleClick = () =>{
    (this.state.url === this.props.pokemon.sprites.front) ? this.setState({
      url: this.props.pokemon.sprites.back
  }) : this.setState({
      url: this.props.pokemon.sprites.front
    })
  }

  render(props) {
    return (
      <Card>
        <div>
          <div className="image" onClick={() => this.handleClick()}>
            <img src={this.state.url} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats.hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
