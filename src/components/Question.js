import React, { Component } from 'react'
import Selector from './Selector'

export default class Question extends Component {

    constructor(props) {
        super(props)
        this.radiobuttonClicked = this.radiobuttonClicked.bind(this)
    }
    
    radiobuttonClicked(event) {
        //Note asynchronicity, if really quick, rating might be unset.
        this.props.updateAnswer(this.props.listID, event.target.value);
    }

    render() {
        return (
            <div className="question">
                <div>{this.props.topic}</div>
                <div>{this.props.text}</div>
                <Selector radiobuttonChanged={this.radiobuttonClicked} title={this.props.topic}/>
            </div>
        )
    }
}
