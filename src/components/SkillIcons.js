import React, { PureComponent } from 'react'
import './skillIcon.css';

export default class SkillIcons extends PureComponent {
  render() {
    const {skill, skillName} = this.props;
    if (skillName === "Overall"){
      return (
        <div style={{height: "45px"}}>
          <span><strong>Total</strong></span>
          <span> {parseInt(skill.level) < 10 ? `0${skill.level}` : skill.level}</span>
        </div>
      );
    }else{    
      return (
        <div style={{height: "45px"}}>
          <img src={`/icons/${skillName}_icon.png`} alt={skillName} title={`${skillName} - level ${skill.level}`} style={{width: "25px",height: "25px"}}/>
          <span> {parseInt(skill.level) < 10 ? `0${skill.level}` : skill.level}</span>
        </div>
      )
    }
  }
}
