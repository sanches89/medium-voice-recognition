import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import VoiceRecognition from '../VoiceRecognition';

const validBackgroundColors = ['azul', 'verde', 'vermelho', 'cinza'];

export default class App extends Component {
  state = { bgColor: 'azul' };

  handleChangeBackgroundColor = result => {
    const bgColor = result.toLowerCase();

    console.log(bgColor);

    validBackgroundColors.includes(bgColor) && this.setState({ bgColor });
  };

  render() {
    const { bgColor } = this.state;

    return (
      <div className="App">
        <header className={`App-header -${bgColor}`}>
          <VoiceRecognition
            onSpeechStart={console.log}
            onResult={this.handleChangeBackgroundColor}
          />
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
