import React, { PureComponent } from 'react'

export default class SkillIcons extends PureComponent {
  render() {
    const {skill, skillName} = this.props;
    return (
      <div style={{width: "30%", display: "inline-block", textAlign: "center"}}>
        <img src={`/icons/${skillName}_icon.png`} alt={skillName} title={skillName}/>
        <span>{skill.level}</span>
      </div>
    )
  }
}
