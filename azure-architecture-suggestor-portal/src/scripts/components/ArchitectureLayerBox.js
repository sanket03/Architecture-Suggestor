import React, { Component } from 'react';
import '../../styles/ArchitectureLayerBox.scss';

export default class ArchitectureLayerBox extends Component {

  constructor(props) {
    super(props);
  }

  renderEntities(entities) {
    let elementList = [];
    for(let entity in entities) {
        let element = (
            <div 
                key = {entity}
                className={entities[entity].isActive ? 'show' : 'hide'}
            >
                {entities[entity].name}
            </div>
        )
        elementList.push(element);
    }
    return elementList;
  }

  render() {
      let {
          groupData,
          show
      } = this.props;
    return (
        <div className = {show ? 'show outer-box': 'hide outer-box'}>
            <div className = 'inner-box'>    
                {this.renderEntities(groupData.entities)}
            </div>
        </div>
    )
  }
}