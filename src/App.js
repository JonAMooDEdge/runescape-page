import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Col} from 'react-bootstrap';

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
        return;
      })

      var questSkills = [];

      Object.keys(quests).map(key => {      
        questSkills.push({questName: key.toLowerCase(), skills: 
        Object.keys(quests[key].skillReqs).map(skillKey => {
          return{name: skillKey.toLowerCase(), value: quests[key].skillReqs[skillKey]}
        })
        })
        return;
      })

      //console.log(playerSkills)
      //console.log(questSkills)

      var eligibleQuests = []

      questSkills.map(quest => {
        if(quest.skills.length == 0){
          eligibleQuests.push(quest);
          return
        }else{
          var questEligibility = []
          quest.skills.map(skill =>{
            questEligibility.push(this.skillChecks(skill,playerSkills));
            //console.log(`SkillName ${skill.name} ${this.skillChecks(skill, playerSkills)}`);          
          })

          if(!questEligibility.includes(false)){
            eligibleQuests.push(quest);
          }
        }
      })

      console.log(eligibleQuests);
    }
  }

  skillChecks = (skill, playerSkills) => {
    playerSkills.map(ps => {
      
      if(ps.name == skill.name){        
        return ps.value.level >= skill.value;
      }
    })
  }

  render() {    
    return (
      <div className="App">
        <h1>Runescape Quests Checker</h1>
        <button onClick={this.checkSkills}>checkskills</button>
        <Grid>
          <Row>
            <Col xs={12} sm={2}>
              <CharacterContainer player={this.state.player} characterName={this.state.characterName} getCharacter={this.getCharacter}/>
            </Col>
            <Col xs={12} sm={10}>
              <QuestContainer quests={quests}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
