import React, { Component, MouseEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import { Platform, PopupService } from '@scion/workbench-application.core';

class App extends Component {

  state = {
    joke: '...'
  };

  componentDidMount(): void {
    fetch("https://icanhazdadjoke.com/", {headers: {Accept: "application/json"}})
      .then((res) => res.json())
      .then((res) => {
        this.setState({joke: res.joke})
      });
  }

  createContact = (event: MouseEvent<HTMLButtonElement>) => {
    Platform.getService(PopupService).open({anchor: event.currentTarget, position: 'north'}, {entity: 'contact', action: 'create'})
  };


  render() {
    return (
        <div className="App">
          <header className="App-header">
            <p> Here is your personal joke:</p>
            <p>{this.state.joke}</p>
            <img src={logo} className="App-logo" alt="logo" />

            <button onClick={this.createContact}>Create contact</button>

          </header>
        </div>
    );
  }
}

export default App;
