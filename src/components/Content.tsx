import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { AnsweredQuestion, Answers, UserFormCreated } from '../types'
import Router from './Router'
import * as helper from '../helperFunctions'
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/custom-queries';

const testData: AnsweredQuestion[] = [
    {
        question: {
            text: "Text 1",
            topic: "Topic 1",
            group: "Group 1",
            category: "Category 1"
        },
        answer: 2
    }, {
        question: {
            text: "Text 2",
            topic: "Topic 2",
            group: "Group 1",
            category: "Category 1"
        },
        answer: 3
    }, {
        question: {
            text: "Text 3",
            topic: "Topic 3",
            group: "Group 1",
            category: "Category 2"
        },
        answer: 3
    }, {
        question: {
            text: "Text 4",
            topic: "Topic 4",
            group: "Group 1",
            category: "Category 2"
        },
        answer: 5
    }, {
        question: {
            text: "Text 5",
            topic: "Topic 5",
            group: "Group 1",
            category: "Category 4"
        },
        answer: 2
    },
]

const Content = () => {
    
    const [answers, setAnswers] = useState<Answers>();
    const [formDefinition, setFormDefinition] = useState<any | null>(null);

    const createAnswers = (): Answers => {
        if(!formDefinition) return {};
        let formDef = formDefinition.data.getFormDefinition;
        let as = {} as Answers;
        if(formDef?.questions.items){
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

    const updateAnswer = (key: string, rating: number): void => {
        let newAnswers = {...answers};
        newAnswers[key].rating = rating;
        setAnswers(newAnswers);
    }

    useEffect(() => {
        setAnswers(createAnswers());
    }, [formDefinition]);
    
    //TODO: Need more refactoring
    const createUserForm = async () => {
        let userForm: UserFormCreated | undefined = (await helper.callGraphQL<UserFormCreated>(mutations.createUserForm, {input: {}})).data;
        console.log(userForm);
        if(!answers){
            console.warn("answers is undefined");
            return;
        }
        for (const [key, value] of Object.entries(answers)) {
            if(!value.rating) continue;
            API.graphql(graphqlOperation(
                mutations.createQuestionAnswer, {input: {
                    userFormID: userForm?.createUserForm.id, 
                    answer: value.rating, 
                    questionAnswerQuestionId: key
                }
            }))
        }
    }

    useEffect(() => {
        getFormDefinition().then(f => {
            setFormDefinition(f);
        });
    }, []);

    async function getFormDefinition() {
        return API.graphql(graphqlOperation(queries.getFormDefinitionWithQuestions, { id: "fd1" }));
    }

    return(
        <div>
            <Router  
                answerProps={{
                    updateAnswer: updateAnswer,
                    formDefinition: formDefinition,
                    createUserForm: createUserForm
                }}
                statsProps={{
                    data: testData
                }} />
        </div>
    );

};

export default Content;