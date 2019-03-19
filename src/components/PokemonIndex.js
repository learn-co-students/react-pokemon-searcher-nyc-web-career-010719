import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  constructor() {
    super()
    this.state = ({
      pokemon: [],
      value: '',
      isLoading:false,
      results: [],
    })
  }

  fetchPokemon(){
    fetch('http://localhost:3000/pokemon')
    .then(r => r.json())
    .then(pokemon => this.setState({ pokemon:pokemon,results:pokemon }))

  }

  componentDidMount(){
    this.setState({})
    this.fetchPokemon()
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: this.state.pokemon, value: '' })
    this.fetchPokemon()
}

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result })
    console.log(result)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.pokemon, isMatch)
      })
    }, 2)
  }

  render() {
    const { isLoading, value, results } = this.state
    console.log(this.state.results)
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 0, { leading: true })}
            results={results}
            value={value}
             />
        <br />
        <PokemonCollection allPokemon={this.state.results} />
        <br />
        <PokemonForm reset={(e)=>this.componentDidMount(e)}/>
      </div>
    )
  }
}

export default PokemonPage
