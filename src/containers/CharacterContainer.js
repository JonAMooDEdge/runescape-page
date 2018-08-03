import React, { PureComponent } from 'react'
import CharacterRetrieve from '../components/CharacterRetrieve'
import CharacterView from '../components/CharacterView'

export default class CharacterContainer extends PureComponent {
  render() {
    
    return (
      <div>
        <CharacterRetrieve getCharacter={this.props.getCharacter}/>
        {this.props.characterName && this.props.player ?
        <CharacterView character={this.props.player} name={this.props.characterName}/>: null}      
      </div>
    )  
  }
}
