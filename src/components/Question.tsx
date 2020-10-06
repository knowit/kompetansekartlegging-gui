import React from 'react'
import Selector from './Selector'

type Props = {
    updateAnswer: (listId: string, value: number) => void,
    topic: string,
    text: string,
    listID: string,
    checked: number | null
}

const Question = ({...props}: Props) => {

    const radiobuttonClicked = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.updateAnswer(props.listID, parseInt(event.target.value));
    }

    return (
        <div className="question">
            <div>{props.topic}</div>
            <div>{props.text}</div>
            <Selector radiobuttonChanged={radiobuttonClicked} title={props.topic} checked={props.checked} />
        </div>
    )
    
}

export default Question;