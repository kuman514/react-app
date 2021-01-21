import React, { Component } from 'react'
import './App.css'
import Subject from './components/Subject'
import TOC from './components/TOC'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import Control from './components/Control'

class App extends Component {
  constructor (props) {
    super(props)
    this.max_content_id = 3
    this.state = {
      mode: 'create',
      selected_content_id: 2,
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
    console.log('App render')
    let _title, _desc, _article = null
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title
      _desc = this.state.welcome.desc
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      _title = this.state.contents[this.state.selected_content_id].title
      _desc = this.state.contents[this.state.selected_content_id].desc
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        alert('add content')
        this.max_content_id++
        let new_content = this.state.contents.concat(
          {id: this.max_content_id, title: _title, desc: _desc}
        )
        this.setState({
          contents: new_content
        })
      }.bind(this)}></CreateContent>
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
        <TOC
          data={this.state.contents}
          onChangePage={function (target_id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(target_id) - 1
            })
          }.bind(this)}>
        </TOC>
        <Control onChangeMode={function (_mode) {
          this.setState({
            mode: _mode
          })
        }.bind(this)}></Control>
        {_article}
      </div>
    )
  }
}

export default App
