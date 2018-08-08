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
    characterName:null,
    quests: [],
    isChecked: false,
    completedQuests: [],
    hideCompleted: false
  }

  componentWillMount(){
    this.setState({quests: quests});
  }

  getCharacter = (character) => {
    getPlayer(character).then(player => {      
      this.setState({characterName: character, player: player, isChecked: true}, () => {
        this.getQuests()
      });
    })
  }

  clearCharacter = () => {
    this.setState({quests: quests, characterName: null, isChecked: false, player: null})
  }

  getQuests = () => {
    if(this.state.player){

      var playerSkills = [];

      Object.keys(this.state.player.Skills).map(key => {
        playerSkills.push({name: key.toLowerCase(), value: this.state.player.Skills[key]})
        return;
      })

      var questSkills = [];

      Object.keys(quests).map(key => {      
        questSkills.push({quest: quests[key], skills: 
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
            playerSkills.map(ps => {
              if(ps.name == skill.name){ 
                if(parseInt(ps.value.level) >= parseInt(skill.value)){
                  questEligibility.push("Y");
                }else{
                  questEligibility.push("N");
                }
              }
            })       
          })

          if(!questEligibility.includes("N")){
            eligibleQuests.push(quest);
          }
        }
      })

      var questList = eligibleQuests.map(eq => {
        console.log(eq.quest.name);
        if((this.state.hideCompleted && !this.state.completedQuests.includes(eq.quest.name)) || !this.state.hideCompleted){
          console.log(eq.quest.name);
          return eq.quest;
        }
      });

      this.setState({quests: questList});
    }
  }

  skillChecks = (skill, playerSkills) => {
    playerSkills.map(ps => {
      
      if(ps.name == skill.name){ 
        console.log(ps.name, ps.value.level, skill.name, skill.value, parseInt(ps.value.level) >= parseInt(skill.value));
        return parseInt(ps.value.level) >= parseInt(skill.value);
      }
    })
  }

  toggleQuests = () => {    
    if(this.state.isChecked){
      this.setState({isChecked: false, quests: quests});
    } else {
      this.setState({isChecked: true}, () => this.getQuests());
    }
  }

  completeQuest = (quest) => {
    this.setState({completedQuests: [...this.state.completedQuests, quest]});
  }

  removeCompletedQuest = (quest) => {
    var index = this.state.completedQuests.indexOf(quest)
    let completedQuests = this.state.completedQuests.slice(index, index+1);

    this.setState({completedQuests: completedQuests});
  }

  hideCompleted = () => {
    this.setState({hideCompleted: !this.state.hideCompleted}, () => this.getQuests())
    
  }

  render() {    
    return (
      <div className="App">
        <h1>Runescape Quests Checker</h1>
        <Grid>
          <Row>
            <Col xs={12} lg={4}>
              <CharacterContainer 
                player={this.state.player}                 
                characterName={this.state.characterName} 
                getCharacter={this.getCharacter} 
                isChecked={this.state.isChecked} 
                toggleQuests={this.toggleQuests} 
                clearPlayer={this.clearCharacter}/>
            </Col>
            <Col xs={12} lg={8}>
              <QuestContainer 
                quests={this.state.quests} 
                totalQuests={quests.length} 
                completedQuests={this.state.completedQuests}
                completeQuest={this.completeQuest}
                removeCompletedQuest={this.removeCompletedQuest}
                hideComplete={this.state.hideCompleted}
                hideCompleted={this.hideCompleted} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
