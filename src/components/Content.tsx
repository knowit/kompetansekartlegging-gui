import React, { useEffect, useState } from 'react'
import { AnswerData, AnsweredQuestion, BatchCreatedQuestionAnswer, FormDefinition, ListedFormDefinition, UserFormCreated } from '../types'
import Router from './Router'
import * as helper from '../helperFunctions'
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as customQueries from '../graphql/custom-queries';

const Content = () => {
    
    const [answers, setAnswers] = useState<AnswerData[]>([]);
    const [formDefinition, setFormDefinition] = useState<FormDefinition | null>(null);
    const [radarData, setRadarData] = useState<AnsweredQuestion[]>([]);
    const [submitEnabled, setSubmitEnabled] = useState<boolean>(true);

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
                    category: element.question.category,
                    knowledge: -1,
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
                answer: answers[i].knowledge,
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
            if(answers[i].knowledge<=0 && answers[i].motivation<=0) continue;
            questionAnswers.push({
                userFormID: userForm?.createUserForm.id,
                knowledge: answers[i].knowledge,
                motivation: answers[i].motivation,
                questionAnswerQuestionId: answers[i].questionId
            });
        }

        //TODO: Use result to update: Remember that result is now an array, which must be looped.
        let result = (await helper.callBatchGraphQL<BatchCreatedQuestionAnswer>(mutations.batchCreateQuestionAnswer, {input: questionAnswers}));
        if(!result) return;
        console.log(result);
        //updateRadarData(result);
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

    //TODO: This might be broken with new motivation setup
    const updateAnswer = (questionId: string, rating: number, motivation: boolean): void => {
        let newAnswers: AnswerData[] = [...answers];
        let answer = newAnswers.find(a => a.questionId === questionId);
        if(!answer) return;
        if(motivation) answer.motivation = rating;
        else answer.knowledge = rating;
        setAnswers(newAnswers);
    }

    const fetchLastFormDefinition = async () => {
        let formList = await helper.callGraphQL<ListedFormDefinition>(queries.listFormDefinitions);
        let lastForm = await helper.getLastItem(formList.data?.listFormDefinitions.items);
        let currentForm = await helper.callGraphQL<FormDefinition>(customQueries.getFormDefinitionWithQuestions, {id: lastForm?.id})
        if(currentForm.data) setFormDefinition(currentForm.data);
    }
    
    const hasAnsweredAtleastOnce = (): boolean =>{
        for(const answer of answers) {
            if(answer.knowledge >= 0 || answer.motivation >= 0) return true;
        }
        return false;
    };
    
    useEffect(() => {
        fetchLastFormDefinition();
    }, []);


    useEffect(() => {
        setAnswers(createAnswers());
    }, [formDefinition]);

    useEffect(() => {
        setRadarData(createRadarData());
        setSubmitEnabled(hasAnsweredAtleastOnce());
    }, [answers]);

    

    return(
        <div>
            <Router  
                answerProps={{
                    updateAnswer: updateAnswer,
                    formDefinition: formDefinition,
                    createUserForm: createUserForm,
                    submitEnabled: submitEnabled,
                    answers: answers
                }}
                statsProps={{
                    data: radarData
                }} />
        </div>
    );

};

export default Content;