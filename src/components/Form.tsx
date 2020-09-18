import React, { useState } from 'react'
import Question from './Question';

let questionFile = "";
try { questionFile = require('../form.json'); }
catch (e) { console.warn("Cant find form.json") }

type AnswerData = {
    topic: string,
    category: string,
    rating: string
};
type Answers = {
    [key: string]: AnswerData
};
type QuestionData = {
    text: string,
    topic: string,
    category: string
}

export default function Form() {

    function updateAnswer(key: string, rating: string): void {
        //Note asynchronicity, if really quick, rating might be unset.
        let dummy = {...answers};
        dummy[key].rating = rating;
        setAnswers(dummy);
    }

    function createQuestions(): JSX.Element[] {
        let qs: JSX.Element[] = [];
        Object.entries(questionFile).forEach(([key, value]) => {
            let values = Object.entries(value);
            qs.push(
                <Question 
                    key={key} 
                    listID={key}
                    topic={values.find(v => v[0] === "topic")?.[1] || ""}
                    text={values.find(v => v[0] === "text")?.[1] || ""}
                    updateAnswer={updateAnswer}
                />
            );
        });
        return qs;
    };

    function createAnswers(): Answers {
        let as = {} as Answers;
        Object.entries(questionFile).forEach(([key, value]) => {
            let values = Object.values(value);
            as[key] = {
                topic: values.find(v => v[0] === "topic")?.[1] || "",
                category: values.find(v => v[0] === "category")?.[1] || "",
                rating: ""
            }
        });
        return as;
    };

    const [questions] = useState(createQuestions());
    const [answers, setAnswers] = useState(createAnswers());

    function printAllAnswers(): void {
        console.log(answers);
    }
    
    return (
        <div className="form"> 
            {questions}
            <button onClick={printAllAnswers}>Print all</button>
        </div>
    )
}
