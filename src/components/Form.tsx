import React, {useEffect, useState} from 'react'
import { AnswerProps } from '../types';
import { Category } from './Category';
import Question from './Question';

const Form = ({...props}: AnswerProps) => {

    const [questions, setQuestions] = useState<JSX.Element[]>();

    const createQuestions = (): JSX.Element[] => {
        if(!props.formDefinition) return [];
        let items = props.formDefinition.getFormDefinition.questions.items;
        if(!items) return [];

        items = items.sort((a,b) => (a.question.category < b.question.category) ? -1 : 1)
        let qs: JSX.Element[] = [];
        let cs: JSX.Element[] = [];
        let categoryNames: string[] = [];
        
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if(!item) continue;
            if(!categoryNames.includes(item.question.category)) {
                //Get last category name and add all current questions to it.
                if(categoryNames.length > 0){
                    let categoryName = categoryNames[categoryNames.length-1];
                    cs.push(
                        <Category name={categoryName} key={categoryNames.length}>
                            {qs}
                        </Category>
                    )
                    qs = [];
                }
                
                categoryNames.push(item.question.category);
            }
            
            const answer = props.answers.find(a => a.questionId === item.question.id);
            qs.push(
                <Question 
                    key={item.question.id} 
                    questionId={item.question.id}
                    topic={item.question.topic}
                    text={item.question.text}
                    updateAnswer={props.updateAnswer}
                    knowledgeChecked={answer ? (answer.knowledge ? answer.knowledge : 0) : -1}
                    motivationChecked={answer ? (answer.motivation ? answer.motivation : 0) : -1}
                />
            );
        }
        //Add last category
        let categoryName = categoryNames[categoryNames.length-1];
        cs.push(
            <Category name={categoryName} key={categoryNames.length+1} >
                {qs}
            </Category>
        )
        return cs;
    };

    useEffect(() => {
        setQuestions(createQuestions());
    }, [props.formDefinition])

    return (
        <div className="form">
            {questions}
            <button onClick={props.createUserForm} disabled={!props.submitEnabled}>Submit Answers</button>
            <p>{props.submitFeedback}</p>
        </div>
    )
}

export default Form;
