import React, { useState } from 'react'
import Question from './Question';

let questionFile = "";
try { questionFile = require('../form.json'); }
catch (e) { console.warn("Cant find form.json") }

export default function Form() {

    const updateAnswer = (key, rating) => {
        //Note asynchronicity, if really quick, rating might be unset.
        let dummy = {...answers};
        dummy[key].rating = rating;
        setAnswers(dummy);
    }

    const createQuestions = () => {
        let qs = [];
        for (const [key, value] of Object.entries(questionFile)) {
            qs.push(
                <Question 
                    key={key} 
                    listID={key} 
                    text={value.text} 
                    topic={value.topic}
                    updateAnswer={updateAnswer}
                />
            );
        }
        return qs;
    };

    const createAnswers = () => {
        let as = {};
        for (const [key, value] of Object.entries(questionFile)) {
            as[key] = {topic: value.topic, category: value.category, rating: ""};
        }
        return as;
    };

    const [questions] = useState(createQuestions());
    const [answers, setAnswers] = useState(createAnswers());

    const printAllAnswers = () => {
        console.log(answers);
    }
    
    return (
        <div className="form"> 
            {questions}
            <button onClick={printAllAnswers}>Print all</button>
        </div>
    )
}
