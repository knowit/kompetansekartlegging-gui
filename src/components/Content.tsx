import React, { useEffect, useState } from 'react'
import { AnswerData, AnsweredQuestion, BatchCreatedQuestionAnswer, FormDefinition, UserFormCreated } from '../types'
import Router from './Router'
import * as helper from '../helperFunctions'
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/custom-queries';

const Content = () => {
    
    const [answers, setAnswers] = useState<AnswerData[]>([]);
    const [formDefinition, setFormDefinition] = useState<FormDefinition | null>(null);
    const [radarData, setRadarData] = useState<AnsweredQuestion[]>([]);

    const createAnswers = (): AnswerData[] => {
        if(!formDefinition) return [];
        let formDef = formDefinition.getFormDefinition;
        let as: AnswerData[] = [];
        if(formDef?.questions.items){
            for (let index = 0; index < formDef.questions.items.length; index++) {
                const element = formDef.questions.items[index];
                if (!element) continue;
                as.push({
                    questionId: element.question.id,
                    topic: element.question.topic,
                    type: "knowledge",
                    category: element.question.category,
                    rating: -1,
                    motivation: -1
                });
            }
        }
        return as;
    };

    const createRadarData = (): AnsweredQuestion[] => {
        if(!formDefinition) return [];
        let questionList = formDefinition.getFormDefinition.questions.items;
        if(!answers || !questionList) return [];
        let radarData: AnsweredQuestion[] = [];
        for (let i = 0; i < answers.length; i++) {
            const question = questionList.find(q => q.question.id === answers[i].questionId);
            if (!question) continue;
            radarData.push({
                question: question.question,
                answer: answers[i].rating,
                motivation: answers[i].motivation
            });
        }
        return radarData;
    };
    
    const createUserForm = async () => {
        if(!formDefinition) return;
        let fdid = formDefinition.getFormDefinition.id;
        let userForm: UserFormCreated | undefined = (await helper.callGraphQL<UserFormCreated>(mutations.createUserForm, {input: {"userFormFormDefinitionId": fdid}})).data;
        console.log(userForm);
        if(!answers){
            console.warn("answers is undefined");
            return;
        }

        let questionAnswers = [];

        for(let i = 0; i < answers.length; i++){
            if(!answers[i].rating) continue;
            questionAnswers.push({
                userFormID: userForm?.createUserForm.id,
                answer: answers[i].rating,
                questionAnswerQuestionId: answers[i].questionId
            });
        }

        let result = (await helper.callGraphQL<BatchCreatedQuestionAnswer>(mutations.batchCreateQuestionAnswer, {input: questionAnswers})).data;
        if(!result) return;
        updateRadarData(result);
    }

    const updateRadarData = (batchData: BatchCreatedQuestionAnswer): void => {
        let data = batchData.batchCreateQuestionAnswer;
        let newRadarData: AnsweredQuestion[] = [...radarData];
        for(let i = 0; i < data.length; i++){
            let rData = newRadarData.find(d => d.question.id === data[i].question.id);
            if(rData) rData.answer = data[i].answer;
        }
        setRadarData(newRadarData);
    }

    const updateAnswer = (questionId: string, rating: number, motivation: boolean): void => {
        let newAnswers: AnswerData[] = [...answers];
        let answer = newAnswers.find(a => a.questionId === questionId);
        if(!answer) return;
        if(motivation) answer.motivation = rating;
        else answer.rating = rating;
        setAnswers(newAnswers);
    }

    useEffect(() => {
        helper.callGraphQL<FormDefinition>(queries.getFormDefinitionWithQuestions, { id: "fd5" }).then(f => {
            if(f.data) setFormDefinition(f.data);
        });
    }, []);


    useEffect(() => {
        setAnswers(createAnswers());
    }, [formDefinition]);

    useEffect(() => {
        setRadarData(createRadarData());
    }, [answers]);

    

    return(
        <div>
            <Router  
                answerProps={{
                    updateAnswer: updateAnswer,
                    formDefinition: formDefinition,
                    createUserForm: createUserForm,
                    answers: answers
                }}
                statsProps={{
                    data: radarData
                }} />
        </div>
    );

};

export default Content;