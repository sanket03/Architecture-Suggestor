import React, {Component} from 'react';
import Questions from '../components/Questions';
import Diagram from '../components/Diagram';

import '../../styles/Workspace.scss';

export default class Workspace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: true
        }

        this.activeQuestions = {}

        this.groupQueue = [];
        this.groupQueueHead = 0;
        this.activeGroup = 1;
        
        this.entityQueue = [];
        this.entityQueueHead = 0;
        this.activeEntity = 0

        this.questionQueue = [];
        this.questionQueueHead = 0;
        this.activeQuestion = 0;

        this.groupList = Object.keys(this.props.architectureDetails);
        this.groupListPointer = 1;

        // Binding context to methods
        this.filterQuestionsPerGroups = this.filterQuestionsPerGroups.bind(this);
        this.onOptionSelectHandler = this.onOptionSelectHandler.bind(this);
    }

    // Add related groups to group queue
    addGroupsToQueue(groups) {
        if(Object.keys(groups).length > 0)  {
            this.groupQueue.push(...Object.keys(groups));
        } else {
            this.groupQueue.push(this.groupList[this.groupListPointer])
            this.groupListPointer += 1;
        }
        console.log(this.groupQueue);
    }

    // Set isActive flag for a group
    setActiveGroups(groupObj) {
        this.activeGroup = this.groupQueue[this.groupQueueHead]
        groupObj.isActive = true;
        this.groupQueueHead += 1;
    }

    // Add entities to group queue
    addEntitiesToQueue(entities) {
        this.entityQueue.push(...Object.keys(entities));   
    }

    // Set isActive flag for entities
    setActiveEntity(entities) {
        this.activeEntity = this.entityQueue[this.entityQueueHead];
        entities[this.activeEntity].isActive = true;
        this.entityQueueHead += 1;
    }

    // Add questions to the queue
    addQuestionsToQueue(questions) {
        questions.forEach((question) => {
            if(!(this.questionQueue.includes(question))) {
                this.questionQueue.push(question);
            }
        });
    }

    // Set isActive flag for a group
    setActiveQuestion() {
        this.activeQuestion = this.questionQueue[this.questionQueueHead];
        this.questionQueueHead = this.questionQueueHead + 1;
    }

    // Get groups with questions to be rendered
    filterQuestionsPerGroups(activeGroup, activeQuestion, questionDetails) {
        questionDetails[activeGroup].forEach((questionObj) => {
            if(questionObj.id === activeQuestion.toString()) {
                questionObj.isActive = true;
            }
        });
    }

    // Get the filtered entities as per current option select
    filterEntitiesOnOptionSelect(questionId, choice, questionEntityMapping, entities) {
        let filteredEntities = [];
        let groupEntities = Object.keys(entities);
        let entitiesForQuestion = questionEntityMapping[questionId];
        for(let entity in entitiesForQuestion) {
            if(entitiesForQuestion[entity].split('|').includes(choice)) {
                filteredEntities.push(entity);
            }
        }
        // If no entities match the current choice, then remove those entities from filtered list
        if(filteredEntities.length === 0) {
            filteredEntities = groupEntities.filter((entity) => {
                return Object.keys(entitiesForQuestion).indexOf(entity) === -1;
            })
        }
        return filteredEntities;
    }


    // Handler for option select
    onOptionSelectHandler(event) {
        let {
            architectureDetails,
            questionDetails,
            questionEntityMapping
        } = this.props;

        let activeGroup = this.activeGroup;

        // Get the groupId, questionId and choice for the selected question
        let groupId = event.target.closest('.question').getAttribute('data-group');
        let questionId = event.target.closest('.question').getAttribute('data-id');
        let choice = event.target.nextElementSibling.innerHTML;

        // Get the filtered entities corresponding to the choice selected
        let filteredEntities = this.filterEntitiesOnOptionSelect(questionId, choice, questionEntityMapping, architectureDetails[groupId].entities);

        // If active entity is among the filtered entities
        // Render the next question
        // Else set 
        if(filteredEntities.includes(this.activeEntity)) {
            if(this.questionQueue.length > this.questionQueueHead) {
                this.setActiveQuestion();
                this.filterQuestionsPerGroups(activeGroup, this.activeQuestion, questionDetails); 
            }
        } else {
            let shouldUpdateActiveGroup = true;
            do {
                if(this.entityQueue.length > this.entityQueueHead) {
                    this.setActiveEntity(architectureDetails[activeGroup].entities);
                    if(filteredEntities.includes(this.activeEntity)) {
                        shouldUpdateActiveGroup = false;
                        this.addQuestionsToQueue(architectureDetails[activeGroup].entities[this.activeEntity].questions);
                        this.setActiveQuestion();
                        this.filterQuestionsPerGroups(activeGroup, this.activeQuestion, questionDetails);
                        break;
                    }
                }
            } while(this.entityQueue.length > this.entityQueueHead)

            if(shouldUpdateActiveGroup) {
                this.setActiveGroups(architectureDetails[activeGroup]);
                this.addGroupsToQueue(architectureDetails[activeGroup].relatedGroups);
                this.addEntitiesToQueue(architectureDetails[activeGroup].entities);
                this.setActiveEntity(architectureDetails[activeGroup].entities);
                this.addQuestionsToQueue(architectureDetails[activeGroup].entities[this.activeEntity].questions);
                this.setActiveQuestion();
                this.filterQuestionsPerGroups(activeGroup, this.activeQuestion, questionDetails);
            }
        }

        this.setState(() => ({
            render: true
        }));    
    }

    componentWillMount() {
        let {
            architectureDetails,
            questionDetails
        } = this.props;

        let activeGroup = this.activeGroup;
        this.addGroupsToQueue(architectureDetails[activeGroup].relatedGroups);
        this.addEntitiesToQueue(architectureDetails[activeGroup].entities);
        this.setActiveEntity(architectureDetails[activeGroup].entities);
        this.addQuestionsToQueue(architectureDetails[activeGroup].entities[this.activeEntity].questions);
        this.setActiveQuestion();
        this.filterQuestionsPerGroups(activeGroup, this.activeQuestion, questionDetails);
    }

    render() {
        console.log('hi');
        let {
            architectureDetails,
            questionDetails,
            questionEntityMapping
        } = this.props;
        return (
            <div id = 'workspace'>
                <Questions 
                    questionsObj = {questionDetails}
                    onOptionSelectHandler = {this.onOptionSelectHandler}
                />
                <Diagram 
                />
            </div>
        )
    }
}
