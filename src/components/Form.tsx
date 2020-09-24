import React, { useState } from 'react'
import Question from './Question';
import {Questions, Answers} from '../types'


let questionFile: Questions = {};
try { questionFile = require('../forms.json'); }
catch (e) { console.warn("Cant find form.json") }

export default function Form(props: {formDefinition: any}) {

    function updateAnswer(key: string, rating: number): void {
        //Note asynchronicity, if really quick, rating might be unset.
        let dummy = {...answers};
        dummy[key].rating = rating;
        setAnswers(dummy);
    }

    function createQuestions(): JSX.Element[] {
        let qs: JSX.Element[] = [];
        Object.entries(questionFile).forEach(([key, value]) => {
            qs.push(
                <Question 
                    key={key} 
                    listID={key}
                    topic={value.topic}
                    text={value.text}
                    updateAnswer={updateAnswer}
                />
            );
        });
        return qs;
    };

    function createAnswers(): Answers {
        let as = {} as Answers;
        Object.entries(questionFile).forEach(([key, value]) => {
            as[key] = {
                topic: value.topic,
                group: value.group,
                category: value.category,
                rating: null
            }
        });
        return as;
    };
    
    function printAllAnswers(): void {
        console.log(answers);
    }
    
    const [questions] = useState(createQuestions());
    const [answers, setAnswers] = useState(createAnswers());

    return (
<<<<<<< HEAD
        <div className="form">
            {JSON.stringify(props.formDefinition)}
            {console.log(props.formDefinition)} 
            {/* {questions} */}
=======
        <div className="form"> 
            <p>{JSON.stringify(typeof(props.formDefinition))}</p>
            <p>{JSON.stringify(props.formDefinition)}</p>
            {questions}
>>>>>>> 2858af355300a34ef7699bc19b2ac8f7f66d067b
            <button onClick={printAllAnswers}>Print all</button>
        </div>
    )
}
