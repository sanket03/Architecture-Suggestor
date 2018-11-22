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

        this.groupList = Object.keys(this.props.architectureDetails);
        this.groupListPointer = 1;

        this.groupQueue = [this.groupList[0]];
        this.groupQueueHead = 0;
        this.activeGroup = this.groupList[0];
        
        this.entityQueue = [];
        this.entityQueueHead = 0;
        this.activeEntity = '';

        this.questionQueue = [];
        this.questionQueueHead = 0;
        this.activeQuestion = '';

        // Binding context to methods
        this.filterQuestionsPerGroups = this.filterQuestionsPerGroups.bind(this);
        this.onOptionSelectHandler = this.onOptionSelectHandler.bind(this);
    }

    // Add related groups to group queue
    addGroupsToQueue(groups) {
        let relatedGroupsList = Object.keys(groups);

        // If related groups are present then add to the queue
        // Else add the next group as per architecture
        // Check if they are already present
        if(relatedGroupsList.length > 0)  {
            relatedGroupsList.forEach((group)=> {
                !this.groupQueue.includes(group) && this.groupQueue.push(group);
            })
        } else {
            let nextGroupInGroupList = this.groupList[this.groupListPointer]
            !this.groupQueue.includes(nextGroupInGroupList) && this.groupQueue.push(nextGroupInGroupList);
            this.groupListPointer += 1;
        }
        console.log(this.groupQueue);
    }

    // Set isActive flag for a group
    setActiveGroup(architectureDetails) {
        this.activeGroup = this.groupQueue[this.groupQueueHead]
        architectureDetails[this.activeGroup].isActive = true;
        this.groupQueueHead += 1;
    }

    // Add entities to group queue
    addEntitiesToQueue(entities) {
        this.entityQueue.push(...Object.keys(entities));   
    }

    // Set isActive flag for entities
    setActiveEntity(entities) {
        this.activeEntity = this.entityQueue[this.entityQueueHead];
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

    // Check whether entity queue has exhaused
    ifGroupQueueHasElements() {
        return this.groupQueue.length > this.groupQueueHead;
    }

    // Check whether entity queue has exhaused
    ifEntityQueueHasElements() {
        return this.entityQueue.length > this.entityQueueHead;
    }

    // Check whether entity queue has exhaused
    ifQuestionQueueHasElements() {
        return this.questionQueue.length > this.questionQueueHead;
    }

    performActiveGroupUpdation(architectureDetails, questionDetails) {
        this.addGroupsToQueue(architectureDetails[this.activeGroup].relatedGroups);
        if(this.ifGroupQueueHasElements()) {
            this.setActiveGroup(architectureDetails);
            this.addEntitiesToQueue(architectureDetails[this.activeGroup].entities);
            while(this.ifEntityQueueHasElements()) {
                this.setActiveEntity(architectureDetails[this.activeGroup].entities);
                let activeEntityQuestions = architectureDetails[this.activeGroup].entities[this.activeEntity].questions;
                if(activeEntityQuestions.length > 0) {
                    this.addQuestionsToQueue(architectureDetails[this.activeGroup].entities[this.activeEntity].questions);
                    this.setActiveQuestion();
                    this.filterQuestionsPerGroups(this.activeGroup, this.activeQuestion, questionDetails);
                    break;
                }
            }
        }
    }

    performActiveEntityUpdation(architectureDetails, questionDetails, filteredEntities) {
        let shouldUpdateActiveGroup = true;
        while(this.ifEntityQueueHasElements()) {
            this.setActiveEntity(architectureDetails[this.activeGroup].entities);
            let activeEntityQuestions = architectureDetails[this.activeGroup].entities[this.activeEntity].questions;
            if(filteredEntities.includes(this.activeEntity) && activeEntityQuestions.length > 0) {
                shouldUpdateActiveGroup = false;
                this.addQuestionsToQueue(activeEntityQuestions);
                this.setActiveQuestion();
                this.filterQuestionsPerGroups(this.activeGroup, this.activeQuestion, questionDetails);
                break;
            }
        }

        if(shouldUpdateActiveGroup) {
            this.performActiveGroupUpdation(architectureDetails, questionDetails);
        }
    }

    // Get the filtered entities as per current option select
    filterEntitiesOnOptionSelect(questionId, choice, questionEntityMapping, entities) {
        let filteredEntities = [];
        let groupEntities = Object.keys(entities);
        let entitiesForQuestion = questionEntityMapping[questionId];
        let traversedEntities = this.entityQueue.slice(0, this.entityQueueHead - 1);
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

        // Remove entities which were already filtered in previous pass
        filteredEntities = filteredEntities.filter((entity) => {
            if(traversedEntities.includes(entity)) {
                return entities[entity].isActive
            } else {
                return true
            }
        })

        for(let entity in entities) {
            entities[entity].isActive = filteredEntities.includes(entity);
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
        // If question queue has ended or active entity not in filtered entities
        // Then for each entity in entity queue, set that entity as active entity
        // Check if that entity is part of filtered entities
        // If yes, then check whether that entity have any questions associated with it
        // If yes, then repeat from addQuestionsToQueue and break the loop
        // If no, then continue the loop until entity queue has exhausted
        // Change the active group if end of entity queue

        if(filteredEntities.includes(this.activeEntity)) {
            if(this.ifQuestionQueueHasElements()) {
                this.setActiveQuestion();
                this.filterQuestionsPerGroups(activeGroup, this.activeQuestion, questionDetails); 
            } else {
                this.performActiveEntityUpdation(architectureDetails, questionDetails, filteredEntities);
            }
        } else {
            this.performActiveEntityUpdation(architectureDetails, questionDetails, filteredEntities);
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
        this.setActiveGroup(architectureDetails);
        this.addEntitiesToQueue(architectureDetails[activeGroup].entities);
        this.setActiveEntity(architectureDetails[activeGroup].entities);
        this.addQuestionsToQueue(architectureDetails[activeGroup].entities[this.activeEntity].questions);
        this.setActiveQuestion();
        this.filterQuestionsPerGroups(activeGroup, this.activeQuestion, questionDetails);
    }

    render() {
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
