import React, { PureComponent } from 'react'
import {Form, FormGroup, FormControl, ControlLabel, Button, Col, InputGroup, Glyphicon} from 'react-bootstrap'

export default class CharacterRetrieve extends PureComponent {
  state={
    playerName: ''
  }
  
  handleChange = (e) => {
      this.setState({playerName: e.target.value});
      e.target.value = '';
  }

  clearPlayer = () => {
    this.props.clearPlayer();

    this.setState({playerName : ''})
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            <strong>Player Name</strong>
          </Col>
          <Col sm={8}>
            <InputGroup>
              <FormControl
                type="text"
                value={this.state.playerName}
                onChange={this.handleChange}    
              />
              <InputGroup.Button>
                <Button onClick={this.clearPlayer}><Glyphicon glyph="remove-circle"/></Button>
              </InputGroup.Button>
            </InputGroup>
          </Col>
          <Col sm={1}>
            <Button onClick={() => this.props.getCharacter(this.state.playerName)}>Go!</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}
