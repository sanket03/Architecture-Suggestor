    import React, {Component} from 'react';
    import Questions from '../components/Questions';
    import Diagram from '../components/Diagram';

    import '../../styles/Workspace.scss';

    export default class Workspace extends Component {

        constructor(props) {
            super(props);
            this.state = {
                render: true,
            }

            this.isInitialized = this.props.isInitialized;

            // Binding context to methods
            this.filterQuestionsPerGroups = this.filterQuestionsPerGroups.bind(this);
            this.onOptionSelectHandler = this.onOptionSelectHandler.bind(this);
        }

        // Increment load Count
        incrementLoadCount() {
            this.loadCount += 1;
        }

        // Add related groups to group queue
        addGroupsToQueue(groups) {
            let relatedGroupsList = Object.keys(groups);

            // If related groups are present then add to the queue
            // Check if they are already present
            if(relatedGroupsList.length > 0)  {
                relatedGroupsList.forEach((group)=> {
                    !this.groupQueue.includes(group) && this.groupQueue.push(group);
                })
            }
        }

        // Increment group queue pointer
        incrementGroupQueuePointer() {
            this.groupQueuePointer += 1;
        }

        // Set group queue pointer
        setGroupQueuePointer(index) {
            this.groupQueuePointer = index;
        }

        // Set isActive flag for a group
        setIsActiveFlagForGroups(groupObj) {
            groupObj.isActive = true;
        }

        // Set isActive flag for a group
        resetIsActiveFlagForGroups(groupObj) {
            groupObj.isActive = false;
        }


        // Set active group in group queue
        setActiveGroup(architectureDetails) {
            this.activeGroup = this.groupQueue[this.groupQueuePointer]
            this.setIsActiveFlagForGroups(architectureDetails[this.activeGroup])
            this.incrementGroupQueuePointer();
        }

        // Slice queue from start till index
        sliceQueue(queue, index) {
            return queue.slice(0, index);
        }

        // Reset group queue
        resetGroupQueue(index) {
            this.setGroupQueuePointer(index);
            this.setActiveGroup(this.props.architectureDetails)
        }

        // Check if any parent entity in any of the parent groups is active
        checkForActiveParentEntities(parentEntityObj, architectureDetails) {
            if(Object.keys(parentEntityObj).length > 0) {
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
            } else {
                return true;
            }
        }

        // Set isActive flag for entities
        setIsActiveFlagForEntities(entityObj) {
            entityObj.isActive = true;
        }

        // Reset isActive flag for entities
        resetIsActiveFlagForEntities(entityObj) {
            entityObj.isActive = false;
        }

        // Add entities to group queue
        addEntitiesToQueue(entities) {
            // Add to the queue only if parent entities are present
            for(let entity in entities) {
                let parentEntityObj = entities[entity].parentEntities;
                if(this.checkForActiveParentEntities(parentEntityObj, this.props.architectureDetails)) {
                    this.entityQueue.push(entity);
                } else {
                    this.resetIsActiveFlagForEntities(entities[entity]);
                }
            }
        }

        // Increment entity queue pointer
        incrementEntityQueuePointer() {
            this.entityQueuePointer += 1
        }

        // Set entity queue pointer
        setEntityQueuePointer(index) {
            this.entityQueuePointer = index;
        }

        // Set active entity from amongst entity queue
        // This marks the entity for which questions will be asked
        setActiveEntity() {
            this.activeEntity = this.entityQueue[this.entityQueuePointer];
            this.incrementEntityQueuePointer();
        }

        // Reset entity queue
        resetEntityQueue() {
            this.entityQueue = [];
            this.entityQueuePointer = 0;
            this.activeEntity = '';
        }

        // Add questions to the queue
        addQuestionsToQueue(questions) {
            questions.forEach((question) => {
                question = question.toString();
                if(!(this.questionQueue.includes(question))) {
                    this.questionQueue.push(question);
                }
            });
        }

        // Increment question queue pointer
        incrementQuestionQueuePointer() {
            this.questionQueuePointer += 1;
        }

        // Set is active flag for questions
        // These questions will appear on screen
        setIsActiveFlagForQuestions(questionObj) {
            questionObj.isActive = true;
        }
        
        resetIsActiveFlagForQuestions(questionObj) {
            questionObj.isActive = false;
        }

        // Set isActive flag for a group
        setActiveQuestion() {
            this.activeQuestion = this.questionQueue[this.questionQueuePointer];
            this.incrementQuestionQueuePointer();
        }

        // Set question queue pointer to specified index
        setQuestionQueuePointer(index) {
            this.questionQueuePointer = index;
        }

        // Reset question queue
        resetQuestionQueue(index) {
            this.questionQueue = this.sliceQueue(this.questionQueue, index + 1);
            this.setQuestionQueuePointer(index)
        }


        // Get groups with questions to be rendered
        filterQuestionsPerGroups(activeGroup, activeQuestion, questionDetails) {
            let traversedQuestions = this.sliceQueue(this.questionQueue, this.questionQueuePointer);
            let groupQuestionsObj = questionDetails[activeGroup]
            Object.keys(groupQuestionsObj)
                .forEach((questionId) => {
                    traversedQuestions.includes(questionId) ? this.setIsActiveFlagForQuestions(groupQuestionsObj[questionId]) : this.resetIsActiveFlagForQuestions(groupQuestionsObj[questionId]);
                }, this);
        }
        

        setFilteredByFlag(entityObj, questionId) {
            entityObj.filteredBy = questionId;
        }

        // Check whether entity queue has exhaused
        ifGroupQueueHasElements() {
            return this.groupQueue.length > this.groupQueuePointer;
        }

        // Check whether entity queue has exhaused
        ifEntityQueueHasElements() {
            return this.entityQueue.length > this.entityQueuePointer;
        }

        // Check whether entity queue has exhaused
        ifQuestionQueueHasElements() {
            return this.questionQueue.length > this.questionQueuePointer;
        }

        // Check whether the question has already been answered
        isQuestionAlreadyAnswered(questionId) {
            return this.questionResponseMap.hasOwnProperty(questionId);
        }

        // Check whether the entity is traversed/ if questions are traversed for that entity
        isEntityAlreadyTraversed(entity) {
            let {
                architectureDetails,
                questionDetails,
                questionEntityMapping
            } = this.props;

            let entityQuestions = architectureDetails[this.activeGroup].entities[entity].questions;
            for(let questionId of entityQuestions) {
                if(this.isQuestionAlreadyAnswered(questionId)) {
                    return true;
                }
            }
            return false;
        }

        // Set question response map
        setQuestionResponseMap(questionId, entity, choice) {
            this.questionResponseMap[questionId] = {
                'entity': entity,
                'response': choice
            };  
        }

        // Reset question response map
        resetQuestionResponseMap() {
            for(let questionId in this.questionResponseMap) {
                // Remove all the questions after the clicked question
                // If there is a need to show the question with choices in scenario where the succeeding questions are same 
                // Even after a previous question is clicked then check for questionId inclusion in this.questionqueue rather than traversedQuestions
                let traversedQuestions = this.questionQueue.slice(0, this.questionQueuePointer);
                !traversedQuestions.includes(questionId) && (delete this.questionResponseMap[questionId]);
            }
        }

        // Reset isActive flag for groups in architecture details object
        resetActiveGroups(groupId, architectureDetails) {
            this.resetGroupQueue(this.groupQueue.indexOf(groupId));
            for(let group in architectureDetails) {
                let indexInGroupQueue = this.groupQueue.indexOf(group);
                if(this.groupQueue.includes(group) && indexInGroupQueue < this.groupQueuePointer) {
                    this.setIsActiveFlagForGroups(architectureDetails[group]);
                } else {
                    this.resetIsActiveFlagForGroups(architectureDetails[group]);
                }
            }
        }

        // Reset isActive flag for entities in groups which are inactive
        resetActiveEntitiesForInactiveGroups(architectureDetails) {
            Object.keys(architectureDetails).forEach((group) => {
                if(!architectureDetails[group].isActive) {
                    for(let entity in architectureDetails[group].entities) {
                        this.setIsActiveFlagForEntities(architectureDetails[group].entities[entity]);
                        this.setFilteredByFlag(architectureDetails[group].entities[entity], '')
                    }
                }
            });
        }
        
        // Reset isActive flag for questions in the groups which are inactive
        resetActiveQuestionsForInactiveGroups(questionDetails, architectureDetails) {
            Object.keys(questionDetails).forEach((group) => {
                if(!architectureDetails[group].isActive) {
                    Object.keys(questionDetails[group]).forEach((questionId) => {
                        this.resetIsActiveFlagForQuestions(questionDetails[group][questionId]);
                    });
                }
            });
        }

        // Reset active entities when an already answered question is selected
        resetActiveEntities(entities) {
            let traversedQuestions = this.questionQueue.slice(0, this.questionQueuePointer);
            this.entityQueue.forEach((entity, index) => {
                // Check only if isActive flag is false
                let filteredById = entities[entity].filteredBy;
                if(!entities[entity].isActive && filteredById.length) {
                   
                    if(traversedQuestions.includes(filteredById)) {
                        if(filteredById == this.activeQuestion) {
                            this.setIsActiveFlagForEntities(entities[entity]);
                            this.setFilteredByFlag(entities[entity], '');
                        } else {
                            this.resetIsActiveFlagForEntities(entities[entity]);
                        }
                    } else {
                        this.setIsActiveFlagForEntities(entities[entity]);
                        this.setFilteredByFlag(entities[entity], '');
                    }
                }
            })
        }

        // Get entity for already answered question from question response map
        getActiveEntityForAlreadyAnsweredQuestion(questionId) {
            return this.questionResponseMap[questionId].entity
        }

        // Return questions associated with an entity
        getEntityQuestions(entity) {
            return entity.questions;
        }

        // Check whether entities in current active group has non traversed questions in question queue
        // This handles the case when filtered entity's question has already been traversed in previous pass
        hasNonTraversedQuestions(activeEntityQuestions) {
            for(let questionId of activeEntityQuestions) {
                questionId = questionId.toString();
                if(!this.questionQueue.includes(questionId) || (this.questionQueue.indexOf(questionId) >= this.questionQueuePointer)) {
                    return true;
                }
            }
            return false;
        }

        // This marks the entry of new group to be considered for questions
        performActiveGroupUpdation(architectureDetails, questionDetails) {
            this.addGroupsToQueue(architectureDetails[this.activeGroup].relatedGroups);
            let shouldUpdateActiveGroup = true;
            if(this.ifGroupQueueHasElements()) {
                this.setActiveGroup(architectureDetails);
                this.addEntitiesToQueue(architectureDetails[this.activeGroup].entities);
                while(this.ifEntityQueueHasElements()) {
                    this.setActiveEntity(architectureDetails[this.activeGroup].entities);
                    let activeEntityQuestions = architectureDetails[this.activeGroup].entities[this.activeEntity].questions;
                    if(this.hasNonTraversedQuestions(activeEntityQuestions)) {
                        shouldUpdateActiveGroup = false;
                        this.questionQueue = this.sliceQueue(this.questionQueue, this.questionQueuePointer);
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
        }

        // This marks the entry of new entity to be considered for questions
        performActiveEntityUpdation(architectureDetails, questionDetails, filteredEntities) {
            let shouldUpdateActiveGroup = true;
            while(this.ifEntityQueueHasElements()) {
                this.setActiveEntity(architectureDetails[this.activeGroup].entities);
                let activeEntityQuestions = architectureDetails[this.activeGroup].entities[this.activeEntity].questions;
                if((filteredEntities.includes(this.activeEntity) || !this.isEntityAlreadyTraversed(this.activeEntity)) && this.hasNonTraversedQuestions(activeEntityQuestions)) {
                    shouldUpdateActiveGroup = false;
                    this.questionQueue = this.sliceQueue(this.questionQueue, this.questionQueuePointer);
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

            for(let entity in entitiesForQuestion) {
                entitiesForQuestion[entity].split('|').forEach((option) => {
                    choice.has(option) && filteredEntities.push(entity);
                })
            }

            // Remove entities which were already filtered in previous pass
            // Also remove those which are not present in entity queue 
            // As their parent entities were inactive
            filteredEntities = filteredEntities.filter((entity) => {
                if(this.entityQueue.includes(entity)) {
                    if(entities[entity].isActive) {
                        return true
                    } else {
                        return !(this.isEntityAlreadyTraversed(entity) && entities[entity].filteredBy.length)
                    }
                } else {
                    return false;
                }
            })

            // Set isActive true for filtered entities in architectureDetails object
            for(let entity in entities) {       
                if(filteredEntities.includes(entity)) {
                    this.setIsActiveFlagForEntities(entities[entity])
                } else {
                    if(entity in entitiesForQuestion) {
                        this.resetIsActiveFlagForEntities(entities[entity]);
                    } else {
                        if(entities[entity].isActive) {
                            if(this.isEntityAlreadyTraversed(entity) || entities[entity].questions.length === 0) {
                                this.setIsActiveFlagForEntities(entities[entity])
                            } else {
                                this.resetIsActiveFlagForEntities(entities[entity]);
                            }
                        } else {
                            this.resetIsActiveFlagForEntities(entities[entity]);
                        }
                    }
                }

                // Set isFiltered flag for inactive entities and which are not filtered previously(which are filtered by this question)
                if(!entities[entity].isActive && this.isEntityAlreadyTraversed(entity) && !entities[entity].filteredBy.length) {
                    this.setFilteredByFlag(entities[entity], questionId);
                }
            }

            return filteredEntities;
        }

        // Initialize Root Node
        initializeRootNode(activeGroup) {
            this.rootNode = activeGroup;
            console.log(this.rootNode)
        }

        // Scroll to bottom of the container
        scrollToBottom(selector) {
            let x = selector.scrollHeight;
            selector.scrollTop = x;
        }

        // Handler for option select
        onOptionSelectHandler(event) {
            let {
                architectureDetails,
                questionDetails,
                questionEntityMapping
            } = this.props;

            // Get the groupId, questionId and choice for the selected question
            let $questionElement = event.target.closest('.question');
            let groupId = $questionElement.getAttribute('data-group');
            let questionId = $questionElement.getAttribute('data-id');
            let isMultiple = $questionElement.getAttribute('data-multiple');
            let choice = new Set();
            if(isMultiple) {
                $questionElement.querySelectorAll('.option').forEach((option) => {
                    option.querySelector('input').checked && choice.add(option.innerText);
                })
            } else {
                choice.add(event.target.nextElementSibling.innerText)
            }

            if(this.isQuestionAlreadyAnswered(questionId)) {
                this.resetActiveGroups(groupId, architectureDetails);
                this.resetActiveEntitiesForInactiveGroups(architectureDetails);
                this.resetActiveQuestionsForInactiveGroups(questionDetails, architectureDetails);
                this.resetEntityQueue();
                this.addEntitiesToQueue(architectureDetails[this.activeGroup].entities);
                this.setEntityQueuePointer(this.entityQueue.indexOf(this.getActiveEntityForAlreadyAnsweredQuestion(questionId)));
                this.setActiveEntity();
                let activeEntityQuestions = architectureDetails[this.activeGroup].entities[this.activeEntity].questions;
                this.resetQuestionQueue(this.questionQueue.indexOf(questionId));
                this.addQuestionsToQueue(activeEntityQuestions);
                this.setActiveQuestion();
                this.filterQuestionsPerGroups(this.activeGroup, this.activeQuestion, questionDetails);
                this.resetActiveEntities(architectureDetails[groupId].entities);
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

            this.isInitialized = true;
            this.setState(() => ({
                render: true
            }));    
        }

        // Initialize all the queues
        initializeComponent() {
            let {
                architectureDetails,
                questionDetails
            } = this.props;

            // Initialize group queue
            this.groupList = Object.keys(architectureDetails);
            this.groupQueue = [this.groupList[0]];
            this.groupQueuePointer = 0;
            this.activeGroup = this.groupList[0];
            
            // Initialize entity queue
            this.entityQueue = [];
            this.entityQueuePointer = 0;
            this.activeEntity = '';

            // Initialize question queue
            this.questionQueue = [];
            this.questionQueuePointer = 0;
            this.activeQuestion = '';

            // Initialize question respons map
            // This holds mapping between the question and the entity for which this question was asked
            this.questionResponseMap = {}

            // Initialize component load/render counter
            this.loadCount = 0;

            let activeGroup = this.activeGroup;
            this.addGroupsToQueue(architectureDetails[activeGroup].relatedGroups);
            this.setActiveGroup(architectureDetails);
            this.addEntitiesToQueue(architectureDetails[activeGroup].entities);
            this.setActiveEntity(architectureDetails[activeGroup].entities);
            this.addQuestionsToQueue(architectureDetails[activeGroup].entities[this.activeEntity].questions);
            this.setActiveQuestion();
            this.filterQuestionsPerGroups(activeGroup, this.activeQuestion, questionDetails);
            this.initializeRootNode(activeGroup);
        }

        render() {
            !this.isInitialized && this.initializeComponent();
            this.incrementLoadCount();
            return (
                <div id = 'workspace'>
                    <Questions 
                        questionsObj = {this.props.questionDetails}
                        onOptionSelectHandler = {this.onOptionSelectHandler}
                        questionResponseMap = {this.questionResponseMap}
                        questionQueue = {this.sliceQueue(this.questionQueue, this.questionQueuePointer)}
                        loadCount = {this.loadCount}
                    />
                    <Diagram
                        architectureDetails = {JSON.parse(JSON.stringify(this.props.architectureDetails))}
                        questionDetails = {this.props.questionDetails}
                        questionResponseMap = {this.questionResponseMap}
                        loadCount = {this.loadCount}
                        rootNode = {this.rootNode}
                    />  
                </div>
            )
        }

        componentDidUpdate() {
            this.isInitialized = false;
        }
    }
