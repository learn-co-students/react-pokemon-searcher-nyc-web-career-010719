import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      front: '',
      back: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, hp, front, back } = this.state
    console.log(front)
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name,
        stats: [
          {
            value: hp,
            name: 'hp'
          }
        ],
        sprites: {
          front: front,
          back: back
        }
      })
    })
    .then(res => res.json())
    .then(pokemon => this.props.addPokemon(pokemon))
    .then(this.setState({
      name: '',
      hp: '',
      front: '',
      back: ''
    }))
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid label="Name"
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <Form.Input
              fluid label="hp"
              placeholder="hp" name="hp"
              onChange={this.handleChange}
              value={this.state.hp}
            />
            <Form.Input
              fluid label="Front Image URL"
              placeholder="url"
              name="front"
              onChange={this.handleChange}
              value={this.state.front}
            />
            <Form.Input
              fluid label="Back Image URL"
              placeholder="url"
              name="back"
              onChange={this.handleChange}
              value={this.state.back}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
