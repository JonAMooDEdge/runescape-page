import React, { PureComponent } from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import SkillIcons from './SkillIcons';
import './characterView.css'

export default class CharacterView extends PureComponent {
  render() {
      const skills = this.props.character.Skills;
    return (
      <div>
        <div className="skill-matrix">
            <h2 style={{textAlign: "center"}}>Player - {this.props.name}</h2>
            {Object.keys(skills).map((key) => {
                if(key!= "Overall"){
                  return <SkillIcons skillName={key} skill={skills[key]}/>
                }
            })}
            </div>
    
      </div>
    )
  }
}
