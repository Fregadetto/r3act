import React, { Component } from 'react';
import './App.css';
import ToDo from "./ToDo"

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      loading: false,
      person: '',
      nameFirst: '',
      image: '',
      login: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  
  //APIData
  componentDidMount(){     
    this.setState({loading: true})
    fetch("https://randomuser.me/api/")
      .then(response => response.json())
      .then(data => {
        this.setState({
          person: data.results[0],
          nameFirst: data.results[0].name.first.charAt(0).toUpperCase() + data.results[0].name.first.slice(1),
          nameLast: data.results[0].name.last.charAt(0).toUpperCase() + data.results[0].name.last.slice(1),
          image: data.results[0].picture,
          login: data.results[0].login,
          loading: false
        })
      })
    }

  render() {
      const firstName = this.state.nameFirst
      const firstNameEndsWithS = firstName.slice(-1) === 's' ? '' : 's'
      return (
      <div className="App center">
      <h1>R3ACT</h1>
      { this.state.loading ? 
            <div className="lds-hourglass"></div> :
        <ul>
          <li className="user-card"> 
            <div className="user-card-inner"> 
              <img src={this.state.image.large} alt={this.state.nameFirst + ' ' +this.state.nameLast} />  
              <div className="bold-plus center-text">{this.state.nameFirst} {this.state.nameLast}</div>
              <div className="italisized center-text">{this.state.login.username}</div>    
            </div> 
        </li>
        <li className="todo-list">
          <div className="bold-plus center-text">{this.state.nameFirst + firstNameEndsWithS} att göra lista</div>
          <div className="todo-list-inner"> 
            <ToDo/>
          </div>
        </li>
      </ul>}
    </div>
    );
  }
}

export default App;
