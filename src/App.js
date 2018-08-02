import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import quests from './data/quests.json';

class App extends Component {
  render() {
    quests.map(quest => {
      console.log(quest.name)
    })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Quests</h1>
        </header>
        <ul>
          {quests.map(quest => {
            return <li>{quest.name} - {quest.difficulty}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
