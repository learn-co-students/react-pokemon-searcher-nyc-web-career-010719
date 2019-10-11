import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor(){
    super()
    this.state={
      pokemonArr: [],
      filteredArr: []
    }
  }

  fetchPokemon = () => {
    fetch('http://localhost:3000/pokemon')
    .then(r => r.json())
    .then(r => this.setState({pokemonArr: r, filteredArr: r}))
    console.log("Done");
  }

  componentDidMount(){
    this.fetchPokemon()
  }

  postPokemon = (arg) => {
    fetch('http://localhost:3000/pokemon', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        {
        "name": arg.name,
        "stats": [{
          "value": arg.hp,
          "name": "hp"
        }],
        "sprites": {
          "front": arg.frontUrl,
          "back": arg.backUrl
        }
      }
    )
    }
  )
  .then(r => r.json())
  .then(() => this.test())
  }


  filter = (letter) => {
    let filtered = this.state.pokemonArr.filter(pokemon => pokemon.name.includes(letter))
    this.setState({filteredArr: filtered})
  }

  test = () => {
  this.fetchPokemon()
  }


  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={(e) => this.filter(e.target.value)} />
        <br />
        <PokemonCollection pokemon={this.state.filteredArr}/>
        <br />
        <PokemonForm postFunc={this.postPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
