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
    })
  }

  handleSubmit = () => {
    let data = {
          "name": this.state.name,
          "stats": [
            {
              "value": this.state.hp,
              "name": "hp"
            }
          ],
          "sprites": {
            "front": this.state.front,
            "back": this.state.back
          }
        }

    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then( json => {

      this.setState({
        name: '',
        hp: '',
        front: '',
        back: ''
      })

      this.props.createPokemon(json)
    })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid onChange={ (e) => this.handleChange(e) } label="Name" placeholder="Name" name="name" value={this.state.name}/>
            <Form.Input fluid onChange={ (e) => this.handleChange(e) } label="hp" placeholder="hp" name="hp" value={this.state.hp}/>
            <Form.Input fluid onChange={ (e) => this.handleChange(e) } label="Front Image URL" placeholder="url" name="front" value={this.state.front}/>
            <Form.Input fluid onChange={ (e) => this.handleChange(e) } label="Back Image URL" placeholder="url" name="back" value={this.state.back}/>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
