import React, {useEffect, useState} from 'react'
import Question from './Question';

type Props = {
    createUserForm: () => void,
    updateAnswer: (key: string, rating: number) => void,
    formDefinition: any
}

const Form = ({...props}: Props) => {

    const createQuestions = (): JSX.Element[] => {
        if(!props.formDefinition) return[];
        let formDef = props.formDefinition.data.getFormDefinition;
        let qs: JSX.Element[] = [];
        if(formDef.questions.items){
            for (let index = 0; index < formDef.questions.items.length; index++) {
                const element = formDef.questions.items[index];
                if (!element) continue;
                qs.push(
                    <Question 
                        key={element.question.id} 
                        listID={element.question.id}
                        topic={element.question.topic}
                        text={element.question.text}
                        updateAnswer={props.updateAnswer}
                    />
                );
            }
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
