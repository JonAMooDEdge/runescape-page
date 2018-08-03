import React, { PureComponent } from 'react'

export default class QuestContainer extends PureComponent {
  convertDifficulty = (difficulty) => {
      switch(parseInt(difficulty)){
          case 1:
            return "Novice"
          case 2:
            return "Intermediate"
          case 3:
            return "Experienced"
          case 4:
            return "Master"
          case 5: 
            return "Grandmaster"
          case 6:
            return "Other"
      }
  }

  render() {
    var {quests} = this.props;
    var sortedQuests = quests.sort((a,b) => parseInt(a.difficulty) - parseInt(b.difficulty))
    return (
      <div>
        {sortedQuests.map(quest => {
            return <p>{quest.name} - {this.convertDifficulty(quest.difficulty)}</p>
        })}
      </div>
    )
  }
}
