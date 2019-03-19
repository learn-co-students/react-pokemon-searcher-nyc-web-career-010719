import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    flipped: false,
  };

  handleClick = () => {
    this.setState({
      flipped: !this.state.flipped
    });
  };

  displayName = name => {
    return name.slice(0, 1).toUpperCase() + (name.slice(1));
  };

  hp = () => {
    let index = this.props.stats.indexOf(i => {
      return i.name === 'hp';
    });
    return `${this.props.stats.slice(index)[0].value}`;
  };

  render() {
    return (
      <Card onClick={this.handleClick}>
        <div>
          <div className="image">
            <img src={this.state.flipped ? this.props.sprites.back : this.props.sprites.front} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.displayName(this.props.name)}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.hp()}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
