import React, {Component} from 'react';
import Questions from './Questions';
import Diagram from './Diagram';

import '../../styles/Workspace.scss';

export default class Workspace extends Component {

    constructor(props){
        super(props);

        this.state = {
            activeQuestion: new Set([1])
        }

        this.entitiesPerFilter = {};
        this.activeLevel = '';
        this.onOptionSelectHandler = this.onOptionSelectHandler.bind(this);
    }

    // Create set of activeEntities for each level
    componentDidMount() {
        let architectureDataObj = this.props.architectureDataObj
        for(let level in architectureDataObj.levels) {
            for( let entity in architectureDataObj.levels[level].options) {
                this.entitiesPerFilter[entity] = {included : false, excluded : false};
            }
        }
        console.log(this.entitiesPerFilter)
    }

    onOptionSelectHandler(event) {
        let {
            architectureDataObj,
            filterAzureIdentityMapping
        } = this.props;

        // Get active level and question Id
        this.activeLevel = event.target.closest('.question').getAttribute('data-level');
        let questionId = event.target.closest('.question').getAttribute('data-id');
        let choice = event.target.nextElementSibling.innerHTML;
        let entityMap =  filterAzureIdentityMapping[questionId];
        let includedEntities = [];
        let excludedEntities = [];

        // Get the entities affected by the current selected choice
        for(let entity in entityMap) {
            if(entityMap[entity] === choice) {
                includedEntities.push(entity);
                this.entitiesPerFilter[entity].included = true;
            } else {
                excludedEntities.push(entity);
                this.entitiesPerFilter[entity].excluded = true;
            }
        }

        // Set isActive of current level to true
        for(let level in architectureDataObj["levels"]) {
            if(level===this.activeLevel) {
                architectureDataObj["levels"][level]['isActive'] = true;
                break;
            }
        }

        // Set object for rendering diagram
        let element = []
        let levels = architectureDataObj.levels;
        
        for(let level in levels) {
          let entititesToBeRenderedForCurrentLevel = [];
          let options = levels[level]['options'];
          let parentLevel = parseInt(level) - 1;
            if(level == this.activeLevel) {
                // If no entity is effected by selected choice
                if(includedEntities.length === 0) {
                    // Check whether any of the entities are set to true during previous iteration
                    for(let entity in options) {
                        if(excludedEntities.includes(entity)) {
                            options[entity].isActive = false;
                            // activeEntitiesForLevel.delete(entity);
                        } else {
                            for(let item of options[entity].parent_entities) {
                                if(levels[parentLevel].options[item].isActive) {
                                    options[entity].isActive = true;
                                    break;
                                } else {
                                    options[entity].isActive = false
                                }
                            }
                        }
                    }

                } else {
                    // Set the filtered entities
                    for(let entity in options) {
                        if(includedEntities.includes(entity)) {
                            options[entity].isActive = true;
                        } else {
                            options[entity].isActive = false;
                        }
                    }
                }
            } else if(level > this.activeLevel) {
                let incudedEntity = new Set();
                let excludedEntity = new Set();

                for(let entity in options) {
                    if(this.entitiesPerFilter[entity].included) {
                        incudedEntity.add(entity);
                    }
                }
                for(let entity in options) {
                    if(this.entitiesPerFilter[entity].excluded) {
                        excludedEntity.add(entity);
                    }
                }

                if(incudedEntity.size > 0) {
                    for(let entity in options) {
                        if(incudedEntity.has(entity)) {
                            options[entity].isActive = true;
                        } else {
                            options[entity].isActive = false;
                        }
                    }
                } 
                else {
                    for(let entity in options) {
                        if(excludedEntity.has(entity)) {
                            options[entity].isActive = false
                        } else {
                            for(let item of options[entity].parent_entities) {
                                if(levels[parentLevel].options[item].isActive) {
                                    options[entity].isActive = true;
                                    break;
                                } else {
                                    options[entity].isActive = false
                                }
                            }
                        }
                    }
                }
            }
        }

        this.setState({
          activeQuestion: this.state.activeQuestion.add(parseInt(event.target.name)+1)
        });
    }

    render() {
        let {
            questionsObj,
            architectureDataObj
        } = this.props;
        return (
            <div id = 'workspace'>
                <Questions 
                    questionsObj={questionsObj}
                    activeQuestion={this.state.activeQuestion}
                    onOptionSelectHandler={this.onOptionSelectHandler}/>
                <Diagram 
                    architectureDataObj={architectureDataObj}
                />
            </div>
        )
    }
}
