import React, { PureComponent } from 'react'
import CharacterRetrieve from '../components/CharacterRetrieve'
import CharacterView from '../components/CharacterView'

export default class CharacterContainer extends PureComponent {
  render() {
    
    return (
      <div>
        <CharacterRetrieve getCharacter={this.props.getCharacter} clearPlayer={this.props.clearPlayer}/>
        {this.props.characterName && this.props.player ?
        <CharacterView character={this.props.player} name={this.props.characterName} isChecked={this.props.isChecked} toggleQuests={this.props.toggleQuests}/>: null}      
      </div>
    )  
  }
}
