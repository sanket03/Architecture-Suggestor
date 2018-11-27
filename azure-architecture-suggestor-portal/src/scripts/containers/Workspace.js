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

            this.questionResponseMap = {}

            this.loadCount = 0;

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
            }
        }

        // Set isActive flag for a group
        setActiveGroup(architectureDetails) {
            this.activeGroup = this.groupQueue[this.groupQueueHead]
            architectureDetails[this.activeGroup].isActive = true;
            this.groupQueueHead += 1;
        }

        // Reset group queue
        resetGroupQueue(index) {
            let architectureDetails = this.props.architectureDetails;
            this.groupQueue = this.groupQueue.slice(0, index + 1);
            this.groupQueueHead = index;

            // Traverse the queue to check if the parent group is present
            // As siblings need to be added in the group queue
            for(let index = this.groupQueueHead-1; index >= 0;index--) {
                let groupId = this.groupQueue[index];
                let relatedGroups = architectureDetails[groupId].relatedGroups;
                if(relatedGroups.hasOwnProperty(this.groupQueue[this.groupQueueHead])) {
                    Object.keys(relatedGroups).forEach((group)=> {
                        (!this.groupQueue.includes(group)) && this.groupQueue.push(group);
                    })
                }
                break;
            }
            this.setActiveGroup(this.props.architectureDetails)
        }

        // Check if any parent entity in any of the parent groups is active
        checkForActiveParentEntities(parentEntityObj, architectureDetails) {
            let checkForActiveParentEntitiesInOtherGroups = true;
            let activeParentEntitypresent = false;
            for(let group in parentEntityObj) {
                let parentEntitiesList = parentEntityObj[group];
                for(let parentEntity of parentEntitiesList) {
                    if(architectureDetails[group].entities[parentEntity].isActive) {
                        checkForActiveParentEntitiesInOtherGroups = false;
                        activeParentEntitypresent = true;
                        break;
                    }
                }
                if(!checkForActiveParentEntitiesInOtherGroups) {
                    break;
                }
            }
            return activeParentEntitypresent;
        }

        // Add entities to group queue
        addEntitiesToQueue(entities) {
            // Add to the queue only if parent entities are present
            for(let entity in entities) {
                let parentEntityObj = entities[entity].parentEntities;
                if(Object.keys(parentEntityObj).length > 0) {
                    this.checkForActiveParentEntities(parentEntityObj, this.props.architectureDetails) && this.entityQueue.push(entity);
                } else {
                    this.entityQueue.push(entity);   
                }
            }
            console.log(this.entityQueue);   
        }

        // Set isActive flag for entities
        setActiveEntity() {
            this.activeEntity = this.entityQueue[this.entityQueueHead];
            this.entityQueueHead += 1;
        }

        // Reset entity queue
        resetEntityQueue() {
            this.entityQueue = [];
            this.entityQueueHead = 0;
            this.activeEntity = '';
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
            let traversedQuestions = this.questionQueue.slice(0, this.questionQueueHead);
            questionDetails[activeGroup].forEach((questionObj) => {
                questionObj.isActive = traversedQuestions.includes(parseInt(questionObj.id)) 
            }, this);
        }

        // Reset question queue
        resetQuestionQueue(index) {
            this.questionQueue = this.questionQueue.slice(0, index + 1);
            this.questionQueueHead = index;
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

        // Check whether entities in current active group has non traversed questions in question queue		
        // This handles the case when filtered entity's question has already been traversed in previous pass		
        hasNonTraversedQuestions(activeEntityQuestions) {		
            for(let questionId of activeEntityQuestions) {		
                if(!this.questionQueue.includes(questionId) || (this.questionQueue.indexOf(questionId) >= this.questionQueueHead)) {		
                    return true;		
                }		
            }		
            return false;		
        }			

        performActiveGroupUpdation(architectureDetails, questionDetails) {
            this.addGroupsToQueue(architectureDetails[this.activeGroup].relatedGroups);
            if(this.ifGroupQueueHasElements()) {
                this.setActiveGroup(architectureDetails);
                this.addEntitiesToQueue(architectureDetails[this.activeGroup].entities);
                while(this.ifEntityQueueHasElements()) {
                    this.setActiveEntity(architectureDetails[this.activeGroup].entities);
                    let activeEntityQuestions = architectureDetails[this.activeGroup].entities[this.activeEntity].questions;
                    if(this.hasNonTraversedQuestions(activeEntityQuestions)) {
                        this.addQuestionsToQueue(activeEntityQuestions);
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
                if(filteredEntities.includes(this.activeEntity) && this.hasNonTraversedQuestions(activeEntityQuestions)) {
                    shouldUpdateActiveGroup = false;
                    this.addQuestionsToQueue(activeEntityQuestions);
                    this.setActiveQuestion();
                    this.filterQuestionsPerGroups(this.activeGroup, this.activeQuestion, questionDetails);
                    break;
                }
            }

            if(shouldUpdateActiveGroup) {
                this.resetEntityQueue();
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
            // Also remove those which are not present in entity queue 
            // As their parent entities were inactive 
            // filteredEntities = filteredEntities.filter((entity) => {
            //     if(traversedEntities.includes(entity)) {
            //         return entities[entity].isActive;
            //     } else {
            //         return this.entityQueue.includes(entity);
            //     }
            // })

            filteredEntities = filteredEntities.filter((entity) => {
                if(this.entityQueue.includes(entity)) {
                    return entities[entity].isActive;
                } else {
                    return false;
                }
            })


            // Set isActive true for filtered entities in architectureDetails object
            for(let entity in entities) {
                entities[entity].isActive = filteredEntities.includes(entity);
                if(!entities[entity].isActive && !entities[entity].hasOwnProperty('filteredBy')) {
                    entities[entity].filteredBy = questionId;
                }
            }
            
            console.log('filtered: ', filteredEntities);
            return filteredEntities;
        }

        // Check whether the question has already been answered
        isQuestionAlreadyAnswered(questionId) {
            return this.questionResponseMap.hasOwnProperty(questionId);
        }

        // Set question response map
        setQuestionResponseMap(questionId, entity, choice) {
            this.questionResponseMap[questionId] = {
                'entity': entity,
                'response': choice
            };    
        }

        // Reset isActive flag for groups in architecture details object
        resetActiveGroups(groupId, architectureDetails) {
            this.resetGroupQueue(this.groupQueue.indexOf(groupId));
            for(let group in architectureDetails) {
                let indexInGroupQueue = this.groupQueue.indexOf(group);
                architectureDetails[group].isActive = this.groupQueue.includes(group) && indexInGroupQueue < this.groupQueueHead;
            }
        }

        // Reset isActive flag for entities in groups which are inactive
        resetActiveEntitiesForInactiveGroups(architectureDetails) {
            Object.keys(architectureDetails).forEach((group) => {
                if(!architectureDetails[group].isActive) {
                    for(let entity in architectureDetails[group].entities) {
                        architectureDetails[group].entities[entity].isActive = true;
                        delete architectureDetails[group].entities[entity].filteredBy;
                    }
                }
            });
        }
        
        // Reset isActive flag for questions in the groups which are inactive
        resetActiveQuestionsForInactiveGroups(questionDetails, architectureDetails) {
            Object.keys(questionDetails).forEach((group) => {
                if(!architectureDetails[group].isActive) {
                    questionDetails[group].forEach((question) => {
                        question.isActive = false;
                    });
                }
            });
        }

        getActiveEntityForAlreadyAnsweredQuestion(questionId) {
            return this.questionResponseMap[questionId].entity
        }

        // Reset isActive flag to false for entities to right of current entity in queue
        resetActiveEntitiesToRightOfEntityQueueHead(entities) {
            this.entityQueue.forEach((entity, index) => {
                if(index >= this.entityQueueHead) {
                    entities[entity].isActive = false;
                }
            })
        }

        // Reset isActive flag for entities to the left of current active entity 
        // If they are already filtered in previous passes
        resetActiveEntitiesToLeftOfEntityQueueHead(group, questionEntityMapping) {
            let entities = group.entities;
            this.entityQueue.forEach((entity, index) => {
                if(index < this.entityQueueHead-1) {
                    let entityQuestions = this.getEntityQuestions(entities[entity]);
                    entityQuestions.forEach((questionId) => {
                        if(this.questionQueue.includes(questionId)) {
                            let entityResponseChoice = questionEntityMapping[questionId][entity];
                            let actualResponse = this.questionResponseMap[questionId].response;
                            entities[entity].isActive = (entityResponseChoice === actualResponse)
                        } else {
                            entities[entity].isActive = false;
                        }
                    })
                }
            })
        }

        resetActiveEntities(group, questionEntityMapping) {
            let entities = group.entities;
            this.entityQueue.forEach((entity, index) => {
                if(index >= this.entityQueueHead-1) {
                    // Check only if isActive flag is false
                    if(!entities[entity].isActive) {
                        let filteredById = entities[entity].filteredBy;
                        if(this.questionQueue.includes(filteredById)) {
                            if(filteredById == this.activeQuestion) {
                                entities[entity].isActive = true;
                                delete entities[entity].filteredBy;
                            } else {
                                entities[entity] = false;
                            }
                        } else {
                            entities[entity].isActive = true;
                            delete entities[entity].filteredBy;
                        }
                    }
                }
            })
        }

        resetQuestionResponseMap() {
            for(let questionId in this.questionResponseMap) {
                !this.questionQueue.includes(parseInt(questionId)) && (delete this.questionResponseMap[questionId]);
            }
        }

        getEntityQuestions(entity) {
            return entity.questions;
        }

        // Handler for option select
        onOptionSelectHandler(event) {
            let {
                architectureDetails,
                questionDetails,
                questionEntityMapping
            } = this.props;

            // Get the groupId, questionId and choice for the selected question
            let groupId = event.target.closest('.question').getAttribute('data-group');
            let questionId = event.target.closest('.question').getAttribute('data-id');
            let choice = event.target.nextElementSibling.innerHTML;

            if(this.isQuestionAlreadyAnswered(questionId)) {
                this.resetActiveGroups(groupId, architectureDetails);
                this.resetActiveEntitiesForInactiveGroups(architectureDetails);
                this.resetActiveQuestionsForInactiveGroups(questionDetails, architectureDetails);
                this.resetEntityQueue();
                this.resetQuestionQueue(this.questionQueue.indexOf(parseInt(questionId)));
                this.addEntitiesToQueue(architectureDetails[this.activeGroup].entities);
                this.entityQueueHead = this.entityQueue.indexOf(this.getActiveEntityForAlreadyAnsweredQuestion(questionId));
                this.setActiveEntity();
                let activeEntityQuestions = architectureDetails[this.activeGroup].entities[this.activeEntity].questions;
                this.addQuestionsToQueue(activeEntityQuestions);
                this.setActiveQuestion();
                this.filterQuestionsPerGroups(this.activeGroup, this.activeQuestion, questionDetails);
                this.resetActiveEntities(architectureDetails[groupId]);
                this.resetQuestionResponseMap();
            } 

            // Set the response for currently answered question;
            this.setQuestionResponseMap(questionId, this.activeEntity, choice);

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
                    this.filterQuestionsPerGroups(this.activeGroup, this.activeQuestion, questionDetails); 
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
            this.loadCount += 1;
            return (
                <div id = 'workspace'>
                    <Questions 
                        questionsObj = {this.props.questionDetails}
                        onOptionSelectHandler = {this.onOptionSelectHandler}
                        questionResponseMap = {this.questionResponseMap}
                    />
                    <Diagram
                        architectureDetails = {this.props.architectureDetails}
                        loadCount = {this.loadCount}
                    />  
                </div>
            )
        }
    }
