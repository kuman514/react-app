import React, { Component } from 'react'

class TOC extends Component {
  shouldComponentUpdate (newProps, newState) {
    // determine render update or not
    console.log(
      'TOC should component update',
      newProps.data,
      this.props.data
    )
    if (this.props.data === newProps.data) {
      return false
    } else {
      return true
    }
  }
  render () {
    console.log('TOC render')
    let lists = []
    let data = this.props.data
    for (let i = 0; i < data.length; i++) {
      lists.push(
        <li key={data[i].id}>
          <a
            href={"/content/" + data[i].id}
            data-id={data[i].id} //
            onClick={function (e) {
              e.preventDefault()
              this.props.onChangePage(e.target.dataset.id) //
            }.bind(this)}>
            {data[i].title}
          </a>
        </li>
      )
    }
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    )
  }
}

export default TOC
