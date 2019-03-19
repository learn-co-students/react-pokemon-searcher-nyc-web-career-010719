import React from "react";

class Sort extends React.Component {

  render() {
    return (
      <div>
        <select onChange={e => this.props.handleSort(e.target.value)}>
          <option value="" disabled selected hidden>Sort By...</option>
          <option name="name" value="name"> Name</option>
          <option name="hp" value="hp">Hp</option>
        </select>
      </div>
    )
  }
}
export default Sort
