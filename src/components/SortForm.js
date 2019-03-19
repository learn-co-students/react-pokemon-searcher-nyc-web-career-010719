import React, { Component } from 'react'

class SortForm extends Component {
  render() {
    return (
      <div>
        <h3>Sort By</h3>
        <select onChange={ (e) => this.props.handleSort(e)}>
          <option value="default">Default</option>
          <option value="name1">Name: Ascending</option>
          <option value="name2">Name: Descending</option>
          <option value="hp1">Hp: Lowest to Highest</option>
          <option value="hp2">Hp: Highest to Lowest</option>
        </select>
      </div>
    )
  }
}

export default SortForm
