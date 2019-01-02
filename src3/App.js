import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ColorCircle from './mobx-components/color-circle/index';
import Clicker from './mobx-components/clicker/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ColorCircle/>
          <Clicker/>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
