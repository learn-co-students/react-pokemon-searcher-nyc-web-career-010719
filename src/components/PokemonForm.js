import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {

  state = {
    name: '',
    hp: '',
    frontUrl: '',
    backUrl: ''
  }

  handleChange = (e, { id, value }) => {
    e.persist()
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  // handleChange = (e, { name, value }) => this.setState({ [name]: value })


  handleSubmit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/pokemon', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": this.state.name,
        "stats": [
          {
            "value": this.state.hp,
            "name": 'hp'
          }
        ],
        "sprites": {
          "front": this.state.frontUrl,
          "back": this.state.backUrl
        }
      })
    }).then(r => r.json())
      .then(data => {
      this.props.updatePokemon(data)
    });
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" id="name" value={this.state.name} onChange={this.handleChange}/>
            <Form.Input fluid label="hp" placeholder="hp" id="hp" value={this.state.hp} onChange={this.handleChange}/>
            <Form.Input fluid label="Front Image URL" placeholder="url" id="frontUrl" value={this.state.frontUrl} onChange={this.handleChange}/>
            <Form.Input fluid label="Back Image URL" placeholder="url" id="backUrl" value={this.state.backUrl} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
