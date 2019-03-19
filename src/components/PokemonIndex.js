import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import SortForm from './SortForm'

import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  state = {
    pokemon: [], // all pokemon
    filteredPokemon: []
    // search: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then( json => {
      // console.log(json)
      this.setState({
        pokemon: json,
        filteredPokemon: json
      })
    })
  }

  handleSearch = (e) => {
    let newPokemon = this.state.pokemon.filter( p => {
      return p.name.includes(e.target.value.toLowerCase())
    })

    this.setState({ filteredPokemon: newPokemon })
  }

  createPokemon = (pokemon) => {
    // console.log("gonna create a pokemon!", pokemon);
    let newPokemon = [...this.state.pokemon, pokemon]
    this.setState({
      pokemon: newPokemon,
      filteredPokemon: newPokemon
    })
  }

  handleSort = (e) => {
    // console.log("handle sort", e.target.value);
    if (e.target.value === "name1") {
      this.setState( prevState => {
        return { filteredPokemon: prevState.filteredPokemon.sort(this.sortName1)}
      })
      // console.log(sorted);
    } else if (e.target.value === "name2") {
      this.setState( prevState => {
        return { filteredPokemon: prevState.filteredPokemon.sort(this.sortName2)}
      })
    } else if (e.target.value === "default") {
      this.setState( prevState => {
        return { filteredPokemon: prevState.filteredPokemon.sort(this.sortDefault)}
      })
    } else if (e.target.value === "hp1") {
      this.setState( prevState => {
        return { filteredPokemon: prevState.filteredPokemon.sort(this.sortHp1)}
      })
    } else if (e.target.value === "hp2") {
      this.setState( prevState => {
        return { filteredPokemon: prevState.filteredPokemon.sort(this.sortHp2)}
      })
    }
  }

  sortName1(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  sortHp1(a,b) {
    if (a.stats.find( obj => obj.name === "hp" ).value < b.stats.find( obj => obj.name === "hp" ).value)
      return -1;
    if (a.stats.find( obj => obj.name === "hp" ).value > b.stats.find( obj => obj.name === "hp" ).value)
      return 1;
    return 0;
  }

  sortName2(a,b) {
    if (a.name < b.name)
      return 1;
    if (a.name > b.name)
      return -1;
    return 0;
  }

  sortHp2(a,b) {
    if (a.stats.find( obj => obj.name === "hp" ).value < b.stats.find( obj => obj.name === "hp" ).value)
      return 1;
    if (a.stats.find( obj => obj.name === "hp" ).value > b.stats.find( obj => obj.name === "hp" ).value)
      return -1;
    return 0;
  }

  sortDefault(a,b) {
    if (a.id < b.id)
      return -1;
    if (a.id > b.id)
      return 1;
    return 0;
  }


  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <SortForm handleSort={this.handleSort}/>
        <br />
        <Search onSearchChange={ (e) => this.handleSearch(e) } showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.state.filteredPokemon}/>
        <br />
        <PokemonForm createPokemon={this.createPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
