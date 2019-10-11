import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonSearch extends React.Component {

  state = {
    query: ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.searchPokemon(this.state.query)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.query} onChange={e => this.setState({query: e.target.value})}/>
      </form>
    )
  }
}

export default PokemonSearch

// <h1>Hello From Pokemon Collection</h1>
