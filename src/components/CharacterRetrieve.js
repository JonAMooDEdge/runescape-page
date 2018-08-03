import React, { PureComponent } from 'react'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'

export default class CharacterRetrieve extends PureComponent {
  state={
    playerName: ''
  }
  
  handleChange = (e) => {
      this.setState({playerName: e.target.value});
  }

  render() {
    return (
      <div>
        <FormGroup>
            <ControlLabel>Player Name</ControlLabel>
            <FormControl
                type="text"
                value={this.state.playerName}
                onChange={this.handleChange}    
            />
            <Button onClick={() => this.props.getCharacter(this.state.playerName)}>Get Character</Button>
        </FormGroup>
      </div>
    )
  }
}
