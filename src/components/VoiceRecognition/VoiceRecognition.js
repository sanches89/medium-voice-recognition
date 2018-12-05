import React, { Component } from 'react';
import PropTypes from 'prop-types';

const recognition = new window.webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'pt-BR';
recognition.continuous = true;

export default class VoiceRecognition extends Component {
  static propTypes = {
    onResult: PropTypes.func.isRequired,
    onSpeechStart: PropTypes.func,
  };

  static defaultProps = {
    onSpeechStart: () => {},
  };

  state = { isStarted: false };

  componentDidMount() {
    const { onResult, onSpeechStart } = this.props;

    recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          // É aqui que será capturado uma palavra ou frase dita no microfone
          const content = event.results[i][0].transcript.trim();
          onResult(content);
        }
      }
    };

    recognition.onspeechstart = onSpeechStart;
  }

  handleToggleRecognition = () => {
    const { isStarted } = this.state;

    isStarted ? recognition.stop() : recognition.start();

    this.setState(s => ({ isStarted: !s.isStarted }));
  };

  render() {
    const { isStarted } = this.state;

    return (
      <button onClick={this.handleToggleRecognition}>
        {isStarted ? 'Parar captura de voz' : 'Iniciar captura de voz'}
      </button>
    );
  }
}
