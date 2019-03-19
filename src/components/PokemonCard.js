import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    image: "",
    src: ""
  }

  componentDidMount() {
    this.setState({
      image: "front",
      src: this.props.pokemon.sprites.front
    })
  }

  findHp() {
    let hp = this.props.pokemon.stats.find( obj => {
      return obj.name === "hp"
    })

    return hp.value
  }

  flipImage = () => {
    this.setState( prevState => {
      if (prevState.image === "front") {
        return { image: "back", src: this.props.pokemon.sprites.back}
      } else {
        return { image: "front", src: this.props.pokemon.sprites.front}
      }
    })
  }

  render() {
    return (
      <Card>
        <div>
          <div className="image">
            <img src={this.state.src} alt="oh no!" onClick={this.flipImage}/>
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.findHp()} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
