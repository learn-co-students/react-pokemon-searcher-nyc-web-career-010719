import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import PokemonSearch from './PokemonSearch'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    filtered: [],
    query: ''
  }

  fetchPokemons = () => {
    fetch('http://localhost:3000/pokemon')
    .then(r => r.json())
    .then(ps => {
      this.setState({pokemons: ps, filtered: ps})
    })
  }

  componentDidMount = () => {
    this.fetchPokemons()
  }

  searchPokemon = (searchTerm) => {
    if (searchTerm != "") {
      let filtered = this.state.pokemons.filter(p => p.name.includes(searchTerm))
      this.setState({filtered: filtered})
    } else {
      this.fetchPokemons()
    }
  }

  updatePokemon = (newPoke) => {
    this.setState({pokemons: [...this.state.pokemons, newPoke], filtered: [...this.state.filtered, newPoke]})
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonSearch searchPokemon={this.searchPokemon}/>
        <br />
        <PokemonForm postPokemon={this.postPokemon} handleSubmit={this.handleSubmit}
          handleChange={this.handleChange} updatePokemon={this.updatePokemon}/>
        <br />
        <PokemonCollection pokemons={this.state.filtered}/>
      </div>
    )
  }
}

export default PokemonPage
