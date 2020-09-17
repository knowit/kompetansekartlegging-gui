import React, { useState } from 'react'
import Question from './Question';

let questionFile = "";
try {
    questionFile = require('../form.json');
}
catch (e) {
    console.warn("Cant find form.json")
}

export default function Form(){

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [constructorHasRun, setConstructorHasRun] = useState(0);


    const printAllAnswers = () => {
        console.log(answers);
    }

    const updateAnswer = (key, rating) => {
        //Note asynchronicity, if really quick, rating might be unset.
        let dummy = {...answers};
        dummy[key].rating = rating;
        setAnswers(dummy);
    }

    const constructor = () => {
        if(constructorHasRun>1) return;
        let qs = [];
        let as = {};
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
            as[key] = {topic: value.topic, category: value.category, rating: ""};
        }
        setQuestions(qs);
        setAnswers(as);
        setConstructorHasRun(constructorHasRun+1);
    }

    constructor();
    
    return (
        <div className="form"> 
            {questions}
            <button onClick={printAllAnswers}>Print all</button>
        </div>
    )
}
