import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    searchTerm: ''
  }

  handleSearchChange = (e, {value}) => {
    this.setState({ searchTerm: value })
  }

  componentDidMount(){
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(pokemon => this.setState({ pokemon }))
  }

  addPokemon = newPokemon => {
    this.setState({ pokemon: [...this.state.pokemon, newPokemon] })
  }

  render() {
    const searchedPokemon = this.state.pokemon.filter(pokemon =>
      pokemon.name.includes(this.state.searchTerm)
    )

    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
       <Search onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
        <br />
        <PokemonCollection
        pokemon={searchedPokemon}
        />
        <br />
        <PokemonForm
          addPokemon={this.addPokemon}
          pokemon={this.state.pokemon}
        />
      </div>
    )
  }
}

export default PokemonPage
