import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    filteredPokemons: []
  }


  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(pokemons => {
      this.setState({pokemons})
    })
  }

  handleSearch = (e, { value }) => {
    let filtered = this.state.pokemons.filter(pokemon => {
      if (pokemon.name.includes(value)) {
        return pokemon
      }
      else return false
    })
    this.setState({filteredPokemons: filtered})
  }

  returnPokemons = () => {
    if (this.state.filteredPokemons.length > 0) {
      return this.state.filteredPokemons
    }
    else return this.state.pokemons
  }

  addPokemon = (pokemon) => {
    this.setState(prevState => ({
      pokemons: [...prevState.pokemons, pokemon]
    }))
  }


  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearch, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.returnPokemons()}/>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
