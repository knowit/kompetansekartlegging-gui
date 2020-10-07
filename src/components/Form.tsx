import React, {useEffect} from 'react'
import { AnswerProps } from '../types';
import Question from './Question';

const Form = ({...props}: AnswerProps) => {

    const createQuestions = (): JSX.Element[] => {
        if(!props.formDefinition) return [];
        let items = props.formDefinition.getFormDefinition.questions.items;
        if(!items) return [];
        let qs: JSX.Element[] = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if(!item) continue;
            const answer = props.answers.find(a => a.questionId === item.question.id);
            if(!answer) continue;
            qs.push(
                <Question 
                    key={item.question.id} 
                    questionId={item.question.id}
                    topic={item.question.topic}
                    text={item.question.text}
                    updateAnswer={props.updateAnswer}
                    checked={answer.knowledge}
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
            <button onClick={props.createUserForm}>Submit Answers</button>
        </div>
    )
}

export default Form;
