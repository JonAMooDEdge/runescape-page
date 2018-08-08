import React, { PureComponent } from 'react'
import QuestView from '../components/QuestView';

export default class QuestContainer extends PureComponent {
  render() {
    var {quests, completedQuests, completeQuest, removeCompletedQuest} = this.props;
    var sortedQuests = quests.sort((a,b) => {
      if(parseInt(a.difficulty) > parseInt(b.difficulty)) return 1;
      if(parseInt(a.difficulty) < parseInt(b.difficulty)) return -1;
      if(a.name > b.name) return 1;
      if(b.name > a.name) return -1;
    });
    return (
      <div>                
        <div>
        {sortedQuests.length !== this.props.totalQuests ? <span><strong>Eligible for {sortedQuests.length} out of {this.props.totalQuests} quests</strong></span>:
        <span><strong>Displaying all {this.props.totalQuests} quests</strong></span>}
        </div>
        <br/>        
        <input type="checkbox" id="hideComplete" defaultChecked={this.props.hideComplete} onChange={() => this.props.hideCompleted()}/>
        <label htmlFor="hideComplete">Hide Completed</label>
      <QuestView 
        quests={sortedQuests} 
        completedQuests={completedQuests}
        completeQuest={completeQuest}
        removeCompletedQuest={removeCompletedQuest}
        />
      </div>
    )
  }
}
