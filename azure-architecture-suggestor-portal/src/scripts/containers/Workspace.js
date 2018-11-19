import React, {Component} from 'react';
import Questions from '../components/Questions';
import Diagram from '../components/Diagram';

import '../../styles/Workspace.scss';

export default class Workspace extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {
            architectureDetails,
            questionDetails,
            questionEntityMapping
        } = this.props;
        return (
            <div id = 'workspace'>
                <Questions />
                <Diagram />
            </div>
        )
    }
}
