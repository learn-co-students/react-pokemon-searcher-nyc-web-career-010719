import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    search: ''
  }

  componentDidMount() {
    this.fetchPokemons()
  }

  fetchPokemons = () => {
    let url = 'http://localhost:3000/pokemon'
    fetch(url)
    .then(r => r.json())
    .then(pokemons => this.setState({pokemons}))
  }

  addPokemon = (pokemon) => {
    this.setState({
      pokemons: [...this.state.pokemons,pokemon]
    })
  }

  handleSearchChange = (e, {value}) => {
    this.setState({
      search: value
    })
  }

  manipulatedPokemonList = () => {
    return this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.search))
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearchChange, 50)} showNoResults={false} />
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <PokemonCollection pokemons={this.manipulatedPokemonList()}/>
      </div>
    )
  }
}

export default PokemonPage
