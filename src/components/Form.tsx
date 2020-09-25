import React, { useEffect, useState } from 'react'
import Question from './Question';
import {Questions, Answers, FormDefinitionWithQuestions, UserFormCreated} from '../types'
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations'


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
        if(formDef.questions){
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

        setQuestions(qs);
    };

    useEffect(() => {
        createQuestions();
    }, [props.formDefinition])

    function createAnswers(): Answers {

        if(!props.formDefinition) return {};

        let formDef = props.formDefinition.data.getFormDefinition;

        let as = {} as Answers;
        if(formDef.questions){
            if(formDef.questions.items)

            for (let index = 0; index < formDef.questions.items.length; index++) {
                const element = formDef.questions.items[index];
                if (!element) continue;

                as[element.question.id] = {
                    topic: element.question.topic,
                    group: "knowledge",
                    category: element.question.category,
                    rating: null
                }
            }
        }

        return as;

    };
    
    function printAllAnswers(): void {
        console.log(answers);
    }

    
    async function createUserForm() {
        let userForm : any = await API.graphql(graphqlOperation(mutations.createUserForm, {input: {}}));
        let casted : UserFormCreated = userForm;

        for (const [key, value] of Object.entries(answers)) {
            if(!value.rating) continue;
            API.graphql(graphqlOperation(
                mutations.createQuestionAnswer, {input: {
                    userFormID: casted.data.createUserForm.id, 
                    answer: value.rating, 
                    questionAnswerQuestionId: key
                }
            }))
        }
    }

    
    const [questions, setQuestions] = useState<JSX.Element[] | null>(null);
    const [answers, setAnswers] = useState(createAnswers());

    return (
        <div className="form">
            {questions}
            <button onClick={createUserForm}>Print all</button>
        </div>
    )
}
