import React, { Component } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Levenshtein from '../utils/levenshtein';
import Alert from '../components/Alert';
import DATA from '../data.json';

import './styles/App.css';

class App extends Component {
  state = {
    guessText: '',
    answerStatus: 'waiting',
    guessingIndex: 0,
    rightAnswers: 0,
    wrongAnswers: 0,
    guesses: [],
  }

  componentWillMount() {
    const config = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_DATABASE_URL,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
    };
    window.firebase.initializeApp(config);

    this.initialize();
  }

  initialize = () => {
    const guesses = [];
    const guessesNumber = process.env.REACT_APP_GUESSES_NUMBER;

    do {
      const n = Math.floor((Math.random() * DATA.length) + 1);
      guesses.push(DATA.splice(n, 1));
    } while (guesses.length < guessesNumber - 1);

    this.setState({
      guesses: guesses.map(g => g[0]),
    });
  }

  verifyAnswer = () => {
    const { guesses, guessingIndex, guessText, rightAnswers, wrongAnswers } = this.state;

    const guess = guessText.toLowerCase();
    const answer = guesses[guessingIndex].name.toLowerCase();
    
    const right = Levenshtein(guess, answer) <= 2;
    
    this.setState({
      answerStatus: right ? 'right' : 'wrong',
      guessingIndex: guessingIndex + 1,
      guessText: '',
      rightAnswers: right ? rightAnswers + 1 : rightAnswers,
      wrongAnswers: !right ? wrongAnswers + 1 : wrongAnswers,
    });
  }

  verifyAnswerOnEnter = (e) => {
    const { answerStatus, guessText } = this.state;
    if (guessText !== '' && e.keyCode === 13 && answerStatus === 'waiting') {
      e.preventDefault();
      this.verifyAnswer();
    }
  }

  renderMain = () => {
    const { guessText, guesses, guessingIndex } = this.state;
    const answerStatus = this.state.answerStatus;

    const currentGuess = guesses[guessingIndex];
    const answer = guessingIndex > 0 ? guesses[guessingIndex-1].name : '';
    const trainerUrl = currentGuess.trainer ? 'trainer-' : ''; 

    return (
      <main className="App-content">
        <div
          className="image-item-guess"
          role="image"
          aria-required="true"
          aria-label={`Picture of ${guesses[guessingIndex].name}`}
          style={{
            backgroundImage: `url(${guesses[guessingIndex].image}?alt=media)`
          }}
        />

        <input
          onChange={e => this.setState({ guessText: e.target.value })}
          value={this.state.guessText}
          type="text"
          className="input-item--guess"
          onKeyDown={(e) => this.verifyAnswerOnEnter(e)}
        />
          
        <Alert
          success
          tempo={null}
          title="Right answer"
          type="success"
          text={`You got ${answer}`}
          show={answerStatus === 'right'}
          click={() => this.setState({ answerStatus: 'waiting' })}
        />

        <Alert
          success
          tempo={null}
          title="Almost there :("
          type="error"
          text={`The right answer was ${answer}`}
          show={answerStatus === 'wrong'}
          click={() => this.setState({ answerStatus: 'waiting' })}
        />
      </main>
    );
  }

  renderResults = (show) => {
    const { rightAnswers, wrongAnswers } = this.state;

    return (
      <Alert
          success
          show={show}
          tempo={null}
          title={`Good work! You got ${rightAnswers} right answers o/\n\nPlay again?`}
          type="success"
          text=""
          click={() => {
            this.setState({ 
              guessText: '',
              answerStatus: 'waiting',
              guessingIndex: 0,
              rightAnswers: 0,
              wrongAnswers: 0
            });
            this.initialize();
          }}
      />
    );
  }

  render() {
    const { guesses, guessingIndex, guessText, rightAnswers, wrongAnswers } = this.state;
    
    const renderResults = rightAnswers + wrongAnswers === guesses.length;

    return (
      <div className="App">
        <Header progress={(100 * guessingIndex + 1) / guesses.length} />

        {!renderResults && this.renderMain()}
        {this.renderResults(renderResults)}
        
        <footer className="App-footer">
          <Button
            text="Verify"
            success={this.state.guessText !== ""}
            disabled={this.state.guessText === ""}
            onClick={() => this.verifyAnswer()}
          />
        </footer>
      </div>
    );
  }
}

export default App;
