import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import Sort from './Sort'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    sortBy: "default",
    searchTerm: ''
  }

  handleSort = value => {
    this.setState({
      sortBy: value
    })
  }

  passDownPokemons = () => {
    let pokemon = this.state.pokemon
    if (this.state.searchTerm) {
      pokemon = this.filterForSearch(pokemon)
    }
    if (this.state.sortBy === 'name') {
      return this.sortByName(pokemon)
    } else if (this.state.sortBy === 'hp') {
      return this.sortByHp(pokemon)
    } else {
      return pokemon
    }
  }

  sortByName = pokemon => {
    let newPokemons = pokemon.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    })
    return newPokemons
  }

  sortByHp = pokemon => {
    let hpVal = pokemon.sort(function(a, b) {
      var textA = a.stats.find(stat => (stat.name ==='hp'))
      var valA= textA.value
      var textB = b.stats.find(stat => (stat.name ==='hp'))
      var valB= textB.value
      return valA < valB ? -1 : valA > valB ? 1 : 0;
    })
    return hpVal
  }

  filterForSearch = pokemon => {
    let searchedPokemon = pokemon.filter(pokemon =>
      pokemon.name.includes(this.state.searchTerm)
    )
    return searchedPokemon
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value })
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

    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />

        <input type="text" name="name" value={this.state.searchTerm} onChange={(e) => this.handleSearchChange(e)} />

        <br />
        <h1>Pokemon Sorter</h1>
        <Sort
          handleSort={this.handleSort}
          pokemon={this.passDownPokemons()}
        />
        <br />
        <PokemonCollection
          pokemon={this.passDownPokemons()}
        />
        <br />
        <PokemonForm
          addPokemon={this.addPokemon}
          pokemon={this.passDownPokemons()}
        />
      </div>
    )
  }
}

export default PokemonPage
