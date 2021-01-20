import React, { Component } from 'react'
import './App.css'
import Subject from './components/Subject'
import TOC from './components/TOC'
import Content from './components/Content'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 'read',
      subject: {title: 'WEB', sub: 'World wide web'},
      welcome: {title: 'Welcome', desc: 'Hello, React!'},
      contents: [
        {id: 1, title: 'HTML', desc: 'HTML is for information'},
        {id: 2, title: 'CSS', desc: 'CSS is for design'},
        {id: 3, title: 'JavaScript', desc: 'JavaScript is for interaction'}
      ]
    }
  }
  render () {
    let _title, _desc = null
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title
      _desc = this.state.welcome.desc
    } else if (this.state.mode === 'read') {
      _title = this.state.contents[0].title
      _desc = this.state.contents[0].desc
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({
              mode: 'welcome'
            })
          }.bind(this)}>
        </Subject>
        {/*<header>
          <h1><a href="/" onClick={function (e) {
            console.log(e)
            e.preventDefault() // Prevent reload when event function ends
            // use bind and setState to modify state
            this.setState({
              mode: 'welcome'
            })
            // target.bind(object)
            // bind an object to a target
            // Why .setState()?
            // setState doesn't just change state but also notify the update to React
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header>*/}
        <Subject title="React" sub="For UI"></Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    )
  }
}

export default App
