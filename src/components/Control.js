import React, { Component } from 'react'

class Control extends Component {
  shouldComponentUpdate (newProps, newState) {
    // Control does not have to update at all
    return false
  }
  render () {
    console.log('Control render')
    return (
      <ul>
        <li><a href='/create' onClick={function (e) {
          e.preventDefault()
          this.props.onChangeMode('create')
        }.bind(this)}>Create</a></li>
        <li><a href='/update' onClick={function (e) {
          e.preventDefault()
          this.props.onChangeMode('update')
        }.bind(this)}>Update</a></li>
        <li><input type='button' value='Delete' onClick={function (e) {
          e.preventDefault()
          this.props.onChangeMode('delete')
        }.bind(this)}></input></li>
      </ul>
    )
  }
}

export default Control
