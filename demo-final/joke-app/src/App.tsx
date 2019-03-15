import React, { Component, MouseEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import { Platform, PopupService, RouterService } from '@scion/workbench-application.core';

class App extends Component<{}, { joke: string }> {
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

  createPerson = (event: MouseEvent<HTMLButtonElement>) => {
    Platform.getService(PopupService)
        .open({anchor: event.currentTarget, position: 'north'}, {entity: 'contact', action: 'create'})
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p> Here is your personal joke:</p>
          <p>{this.state.joke}</p>
          <button onClick={this.createPerson}>Create Contact</button>
        </header>
      </div>
    );
  }
}

export default App;
