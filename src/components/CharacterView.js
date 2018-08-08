import React, { PureComponent } from 'react';
import { FormGroup, ControlLabel, Checkbox, Grid, Row, Col} from 'react-bootstrap';
import SkillIcons from './SkillIcons';
import './characterView.css';

export default class CharacterView extends PureComponent {
  state={
    isChecked: true
  }

  componentWillMount = () => {
    this.setState({ isChecked: this.props.isChecked});
  }

  render() {
      const skills = this.props.character.Skills;
      const {toggleQuests} = this.props;
    return (
      <div>
        <div className="skill-matrix">
            <h2 style={{textAlign: "center"}}>{this.props.name}</h2>            
            <input type="checkbox" defaultChecked={this.state.isChecked} id="questToggle" onChange={() => toggleQuests()}       />
            <label htmlFor="questToggle">Eligible Quests</label>
            <Grid fluid>
            <Row>
              {Object.keys(skills).map((key) => {
                if(key != "Overall"){
                  return <Col xs={2} lg={3} key={key} className="skill-table"><SkillIcons skillName={key} skill={skills[key]}/></Col>
                }
              })}
                <Col xs={2} lg={3} className="skill-table"><SkillIcons skillName="Overall" skill={skills["Overall"]}/></Col>
              </Row>
            </Grid>
          </div>    
      </div>
    )
  }
}
