import React from 'react'
import Selector from './Selector'

function Question(props) {

    const radiobuttonClicked = (event) => {
        props.updateAnswer(props.listID, event.target.value);
    }

    return (
        <div className="question">
            <div>{props.topic}</div>
            <div>{props.text}</div>
            <Selector radiobuttonChanged={radiobuttonClicked} title={props.topic}/>
        </div>
    )
    
}

export default Question;