import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    fetch('http://localhost:3000/pokemon', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
     body: JSON.stringify({
       name: this.state.name,
       stats: [{
         value: this.state.hp,
         name:"hp"
     }],
     sprites: {
       front: this.state.frontUrl,
       back: this.state.backUrl
     }})
    }).then(r=>r.json())
    .then(this.props.reset)
  }



  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={(e)=>this.setState({name:e.target.value})} />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={(e)=>this.setState({hp:e.target.value})}/>
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={(e)=>this.setState({frontUrl:e.target.value})} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={(e)=>this.setState({backUrl:e.target.value})} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
