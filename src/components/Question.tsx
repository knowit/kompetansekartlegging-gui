import React from 'react'
import Selector from './Selector'

type Props = {
    updateAnswer: (listId: string, value: number) => void,
    topic: string,
    text: string,
    listID: string
}

function Question({updateAnswer, topic, text, listID}: Props) {

    const radiobuttonClicked = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateAnswer(listID, parseInt(event.target.value));
    }

    return (
        <div className="question">
            <div>{topic}</div>
            <div>{text}</div>
            <Selector radiobuttonChanged={radiobuttonClicked} title={topic}/>
        </div>
    )
    
}

export default Question;