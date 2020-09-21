import React, { useState } from 'react'
import Question from './Question';
import {Questions, Answers} from '../types'


let questionFile: Questions = {};
try { questionFile = require('../form.json'); }
catch (e) { console.warn("Cant find form.json") }

export default function Form() {

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
        <div className="form"> 
            {questions}
            <button onClick={printAllAnswers}>Print all</button>
        </div>
    )
}
