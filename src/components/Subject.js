import React, { Component } from 'react'

class Subject extends Component {
  shouldComponentUpdate (newProps, newState) {
    // Subject does not have to update at all
    return false
  }
  render () {
    console.log('Subject render')
    return (
      <header>
        <h1><a href="/" onClick={function (e) {
          e.preventDefault()
          this.props.onChangePage()
        }.bind(this)}>{this.props.title}</a></h1>
        {this.props.sub}
      </header>
    )
  }
}

export default Subject
