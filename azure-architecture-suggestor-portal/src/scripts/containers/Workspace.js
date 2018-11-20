import React, {Component} from 'react';
import Questions from '../components/Questions';
import Diagram from '../components/Diagram';

import '../../styles/Workspace.scss';

export default class Workspace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeGroup: 1 
        }

        this.activeQuestions = {}

        // Binding context to methods
        this.filterQuestionsPerGroups = this.filterQuestionsPerGroups.bind(this);
        this.onOptionSelectHandler = this.onOptionSelectHandler.bind(this);
    }

    // Get groups with questions to be rendered
    filterQuestionsPerGroups(questionDetails) {
        for(let groupId in questionDetails) {
            if(parseInt(groupId) <= this.state.activeGroup) {
                this.activeQuestions[groupId] = questionDetails[groupId];
            }
        }
    }

    onOptionSelectHandler(event) {
        let group = event.target.closest('.question').getAttribute('data-group');
        let questionId = event.target.closest('.question').getAttribute('data-id');
        let choice = event.target.nextElementSibling.innerHTML;
        console.log(group, questionId, choice);
    }

    render() {
        let {
            architectureDetails,
            questionDetails,
            questionEntityMapping
        } = this.props;

        {this.filterQuestionsPerGroups(questionDetails)}

        return (
            <div id = 'workspace'>
                <Questions 
                    questionsObj = {this.activeQuestions}
                    onOptionSelectHandler = {this.onOptionSelectHandler}
                />
                <Diagram 
                />
            </div>
        )
    }
}
