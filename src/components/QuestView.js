import React, { PureComponent } from 'react'
import {Table} from 'react-bootstrap'

export default class QuestView extends PureComponent {
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

convertLength = (length) => {
  switch(parseInt(length)){
    case 1:
      return "Short"
    case 2:
      return "Medium"
    case 3:
      return "Long"
    case 4:
      return "Epic"
  }
}

isCompleted = (quest) => {
  return this.props.completedQuests.includes(quest.name)
}

onChanged = (e) => {
  if(e.target.checked){
    this.props.completeQuest(e.target.name)
  } else {
    this.props.removeCompletedQuest(e.target.name)
  }
}

  render() {
    var {quests} = this.props;
    if(quests.length > 0){
    return (
      <Table responsive hover bordered condensed striped>
        <thead>
          <th>Quest Name</th>
          <th>Difficulty</th>
          <th>Length</th>    
          <th>Skill Reqs</th>     
          <th>Quest Reqs</th>
          <th>Completed</th>
        </thead>
        <tbody style={{textAlign:"left"}}>
        {quests.map(quest => {          
            return <tr key={quest.name}>
              <td>{quest.name}</td>
              <td>{this.convertDifficulty(quest.difficulty)}</td>
              <td>{this.convertLength(quest.length)}</td>  
              <td>{Object.keys(quest.skillReqs).map(key => {
                if(key==="questpoints")
                return <div key={key}><span>Quest Points - {quest.skillReqs[key]}</span></div>
              })}</td>
              <td>{quest.questReqs.map(req => {
                return <div key={req}><span>{req}</span><br/></div>;
              })}
              </td>
              <td><input type="checkbox" name={quest.name} onChange={(e) => {this.onChanged(e)}} defaultChecked={this.isCompleted}/></td>
            </tr>            
            })}
        </tbody>
      </Table>
    )
    } else{
      return null
    }
    
  }
}
