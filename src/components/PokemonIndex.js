import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemon: [],
    search: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
    .then(r=>r.json())
    .then((pokemon) => {
      this.setState({
        pokemon: pokemon
      })
    })
  }

  addPokemon = (newPokemon) => {
    this.setState({
      pokemon: [...this.state.pokemon, newPokemon]
    })
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    let pokemonArray = this.state.pokemon.filter(
      (poke) => {
        return poke.name.indexOf(this.state.search.toLowerCase()) !== -1
      }
    )
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={e => this.handleSearch(e)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={pokemonArray} spriteClick={this.handleSpriteClick} />
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
