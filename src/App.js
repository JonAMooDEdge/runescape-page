import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import quests from './data/quests.json';
import {getPlayer} from './api';

import CharacterContainer from './containers/CharacterContainer';
import QuestContainer from './containers/QuestContainer'

class App extends Component {
  state = {
    player:null,
    characterName:null
  }

  getCharacter = (character) => {
    getPlayer(character).then(player => {      
      this.setState({characterName: character, player: player});
    });    
  }  

  checkSkills = () => {
    if(this.state.player){

      var playerSkills = [];

      Object.keys(this.state.player.Skills).map(key => {
        playerSkills.push({name: key.toLowerCase(), value: this.state.player.Skills[key]})
      })

      var questSkills = [];

      Object.keys(quests).map(key => {      
        questSkills.push({questName: key.toLowerCase(), skills: 
        Object.keys(quests[key].skillReqs).map(skillKey => {
          return{name: skillKey.toLowerCase(), value: quests[key].skillReqs[skillKey]}
        })
        })
      })

      console.log(playerSkills)
      console.log(questSkills)

      var eligibleQuests = []

      questSkills.map(quest => {
        if(quest.skills.length == 0){
          eligibleQuests.push(quest);
        }

        quest.skills.map(skill => {          
          playerSkills.find(s=>s.name === skill.name).value >= skill.value
        })
      })

      console.log(eligibleQuests);
    }
  }

  render() {    
    return (
      <div className="App">
        <h1>Runescape Quests Checker</h1>
        <button onClick={this.checkSkills}>checkskills</button>
        <CharacterContainer player={this.state.player} characterName={this.state.characterName} getCharacter={this.getCharacter}/>
        
        <QuestContainer quests={quests}/>
      </div>
    );
  }
}

export default App;
