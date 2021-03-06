import React, { Component } from 'react'
import './App.css'
import Subject from './components/Subject'
import TOC from './components/TOC'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'
import Control from './components/Control'

class App extends Component {
  constructor (props) {
    super(props)
    this.max_content_id = 3
    this.state = {
      mode: 'welcome',
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
  getReadContent () {
    for (let i = 0; i < this.state.contents.length; i++) {
      let data = this.state.contents[i]
      if (data.id === this.state.selected_content_id) {
        return data
      }
    }
  }
  getContent () {
    let _title, _desc, _article = null
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title
      _desc = this.state.welcome.desc
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      let _content = this.getReadContent()
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        alert('add content')
        this.max_content_id++
        let new_content = this.state.contents.concat(
          {id: this.max_content_id, title: _title, desc: _desc}
        )
        this.setState({
          contents: new_content,
          mode: 'read',
          selected_content_id: this.max_content_id
        })
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      let _content = this.getReadContent()
      _article = <UpdateContent data={_content} onSubmit={function (_id, _title, _desc) {
        alert('update content')
        let new_content = Array.from(this.state.contents)
        for (let i = 0; i < new_content.length; i++) {
          if (new_content[i].id === _id) {
            new_content[i] = {id: _id, title: _title, desc: _desc}
            break
          }
        }
        this.setState({
          contents: new_content,
          mode: 'read'
        })
      }.bind(this)}></UpdateContent>
    }
    return _article
  }
  render () {
    console.log('App render')
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
              selected_content_id: Number(target_id)
            })
          }.bind(this)}>
        </TOC>
        <Control onChangeMode={function (_mode) {
          if (_mode === 'delete') {
            if (window.confirm('Are you sure to delete?')) {
              alert('deleted')
              let now_contents = Array.from(this.state.contents)
              for (let i = 0; i < now_contents.length; i++) {
                if (now_contents[i].id === this.state.selected_content_id) {
                  now_contents.splice(i, 1)
                  break
                }
              }
              this.setState({
                mode: 'welcome',
                contents: now_contents
              })
            }
          } else {
            this.setState({
              mode: _mode
            })
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    )
  }
}

export default App
