import React, {useEffect} from 'react'
import { AnswerProps } from '../types';
import Question from './Question';

const Form = ({...props}: AnswerProps) => {

    const createQuestions = (): JSX.Element[] => {
        if(!props.formDefinition) return [];
        let items = props.formDefinition.getFormDefinition.questions.items;
        if(!items) return [];
        let qs: JSX.Element[] = [];
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            if (!item) continue;
            qs.push(
                <Question 
                    key={item.question.id} 
                    listID={item.question.id}
                    topic={item.question.topic}
                    text={item.question.text}
                    updateAnswer={props.updateAnswer}
                />
            );
        }
        return qs;
    };

    useEffect(() => {
        createQuestions();
    }, [props.formDefinition])

    return (
        <div className="form">
            {createQuestions()}
            <button onClick={props.createUserForm}>Print all</button>
        </div>
    )
}

export default Form;
