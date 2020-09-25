import React, { useEffect, useState } from 'react'
import Question from './Question';
import {Questions, Answers, FormDefinitionWithQuestions} from '../types'


let questionFile: Questions = {};
try { questionFile = require('../forms.json'); }
catch (e) { console.warn("Cant find form.json") }

export default function Form(props: {formDefinition: FormDefinitionWithQuestions}) {

    function updateAnswer(key: string, rating: number): void {
        //Note asynchronicity, if really quick, rating might be unset.
        let dummy = {...answers};
        dummy[key].rating = rating;
        setAnswers(dummy);
    }

    function createQuestions() {
        if(!props.formDefinition) return [];

        let formDef = props.formDefinition.data.getFormDefinition;

        let qs: JSX.Element[] = [];
        console.log(props);
        if(formDef.questions){
            console.log("Hello");
            if(formDef.questions.items)

            for (let index = 0; index < formDef.questions.items.length; index++) {
                const element = formDef.questions.items[index];
                if (!element) continue;
                qs.push(
                    <Question 
                        key={element.question.id} 
                        listID={element.question.id}
                        topic={element.question.topic}
                        text={element.question.text}
                        updateAnswer={updateAnswer}
                    />
                );
            }
        }
        
        console.log(qs);

        // Object.entries(questionFile).forEach(([key, value]) => {
        //     qs.push(
        //         <Question 
        //             key={key} 
        //             listID={key}
        //             topic={value.topic}
        //             text={value.text}
        //             updateAnswer={updateAnswer}
        //         />
        //     );
        // });
        setQuestions(qs);
    };

    useEffect(() => {
        createQuestions();
    }, [props.formDefinition])

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
    
    const [questions, setQuestions] = useState<JSX.Element[] | null>(null);
    const [answers, setAnswers] = useState(createAnswers());

    return (
        <div className="form">
            {questions}
            {console.log(questions)}
            <button onClick={printAllAnswers}>Print all</button>
        </div>
    )
}
