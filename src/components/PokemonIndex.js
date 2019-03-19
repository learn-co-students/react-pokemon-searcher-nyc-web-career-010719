import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
// import _ from 'lodash'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    // filteredPokemon
  };

  getPokemon = () => {
    this.setState({
      pokemon: [],
    }, () => {
      fetch('http://localhost:3000/pokemon')
      .then(r => r.json())
      .then(pokemon => {
        pokemon.forEach(p => {
          this.setState({
            pokemon: [...this.state.pokemon, p]
          });
        });
      });
    });
  };


  componentDidMount() {
    this.getPokemon();
  };

  createPokemon = poke => {
    let data = {
      "name": poke.name,
      "stats": [
        {
          "value": poke.hp,
          "name": "hp"
        }
      ],
      "sprites": {
        "front": poke.frontUrl,
        "back": poke.backUrl
      }
    };

    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(poke => {
      this.setState({
        pokemon: [...this.state.pokemon, poke]
      });
    });
  };

  handleSearch = e => {
    e.preventDefault();
    let filteredPokemon;
    filteredPokemon = this.state.pokemon.filter(p => {
      return p.name.includes(e.target.value.toLowerCase())
    });
    this.setState({
      filteredPokemon
    });
  };

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={e => this.handleSearch(e)} showNoResults={false} />
        <br />
        <PokemonCollection
          filteredPokemon={this.state.filteredPokemon}
          pokemon={this.state.pokemon}
        />
        <br />
        <PokemonForm createPokemon={this.createPokemon}/>
      </div>
    );
  };
};

export default PokemonPage;
