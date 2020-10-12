import React, { useEffect, useState } from 'react'
import { AnswerData, AnsweredQuestion, BatchCreatedQuestionAnswer, FormDefinition, ListedFormDefinition, UserAnswer, UserFormCreated, UserFormList, UserFormWithAnswers } from '../types'
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
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [submitFeedback, setSubmitFeedback] = useState<string>("");

    const createAnswers = (): AnswerData[] => {
        if(!formDefinition) return [];
        let formDef = formDefinition.getFormDefinition;
        let as: AnswerData[] = [];
        if(formDef?.questions.items){
            for (let i = 0; i < formDef.questions.items.length; i++) {
                const element = formDef.questions.items[i];
                if (!element) continue;
                let preAnswer = userAnswers.find(answer => answer.question.id === element.question.id);
                as.push({
                    questionId: element.question.id,
                    topic: element.question.topic,
                    category: element.question.category,
                    knowledge: preAnswer ? (preAnswer.knowledge ? preAnswer.knowledge : 0) : -1,
                    motivation: preAnswer ? (preAnswer.motivation ? preAnswer.motivation : 0) : -1
                });
            }
        }
        return as;
    };

    const createRadarData = (): AnsweredQuestion[] => {
        if(!formDefinition) return [];
        let questionList = formDefinition.getFormDefinition.questions.items;
        if(!answers || !questionList) return [];
        let newRadarData: AnsweredQuestion[] = [];
        for (let i = 0; i < answers.length; i++) {
            const question = questionList.find(q => q.question.id === answers[i].questionId);
            if (!question) continue;
            newRadarData.push({
                question: question.question,
                answer: answers[i].knowledge,
                motivation: answers[i].motivation
            });
        }
        return newRadarData;
    };
    
    const createUserForm = async () => {
        setSubmitFeedback("Sending data to server...");
        if(!formDefinition) return;
        let fdid = formDefinition.getFormDefinition.id;
        let userForm: UserFormCreated | undefined = (await helper.callGraphQL<UserFormCreated>(mutations.createUserForm, {input: {"userFormFormDefinitionId": fdid}})).data;
        if(!answers) return;
        let questionAnswers = [];
        for(let i = 0; i < answers.length; i++){
            if(answers[i].knowledge < 0 && answers[i].motivation < 0) continue;
            questionAnswers.push({
                userFormID: userForm?.createUserForm.id,
                knowledge: answers[i].knowledge,
                motivation: answers[i].motivation,
                questionAnswerQuestionId: answers[i].questionId
            });
        }

        //TODO: Use result to update: Remember that result is now an array, which must be looped.
        let result = (await helper.callBatchGraphQL<BatchCreatedQuestionAnswer>(mutations.batchCreateQuestionAnswer, {input: questionAnswers}));
        if(!result) {
            setSubmitFeedback("Something went wrong when inserting data to server database..");
            return;
        }
        setSubmitFeedback("Your answers has been saved!");
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

        setAnswers(prevAnswers => {
            let newAnswers: AnswerData[] = [...prevAnswers];
            let answer = newAnswers.find(a => a.questionId === questionId);
            if(!answer) return [];
            if(motivation) answer.motivation = rating;
            else answer.knowledge = rating;
            return newAnswers
        })
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

    const getUserAnswers = async () => {
        let allUserAnswers = (await helper.callGraphQL<UserFormWithAnswers>(customQueries.listUserFormsWithAnswers)).data;
        if(!allUserAnswers) return;
        let lastUserAnswer = (await helper.getLastItem(allUserAnswers.listUserForms.items))?.questionAnswers.items;
        if(lastUserAnswer) setUserAnswers(lastUserAnswer);
    };

    const deleteUserData = async () => {
        let userForms = (await helper.callGraphQL<UserFormList>(customQueries.listUserFormsWithAnswers)).data;
        let deleteResult = [];
        if(userForms && userForms.listUserForms.items.length > 0){
            for(let i = 0; i < userForms.listUserForms.items.length; i++) {
                for(const answer of userForms.listUserForms.items[i].questionAnswers.items){
                    deleteResult.push((await helper.callGraphQL(mutations.deleteQuestionAnswer, {input: {"id": answer.id}})));
                }
                deleteResult.push((await helper.callGraphQL(mutations.deleteUserForm, {input: {"id": userForms.listUserForms.items[i].id}})));
            }
            console.log(deleteResult);
        } else console.log("No Userforms active");
    };

    const listUserForms = async () => {
        let userForms = (await helper.callGraphQL<UserFormList>(customQueries.listUserFormsWithAnswers)).data;
        console.log(userForms);
    }
    
    useEffect(() => {
        fetchLastFormDefinition();
        setSubmitFeedback("");
    }, []);

    useEffect(() => {
        getUserAnswers();
        setAnswers(createAnswers());
    }, [formDefinition]);

    useEffect(() => {
        setAnswers(createAnswers());
    }, [userAnswers]);

    useEffect(() => {
        setRadarData(createRadarData());
        setSubmitEnabled(hasAnsweredAtleastOnce());
    }, [answers, userAnswers]);

    

    return(
        <div>
            <Router  
                answerProps={{
                    updateAnswer: updateAnswer,
                    formDefinition: formDefinition,
                    createUserForm: createUserForm,
                    submitEnabled: submitEnabled,
                    answers: answers,
                    submitFeedback: submitFeedback
                }}
                statsProps={{
                    data: radarData
                }}
                userProps={{
                    deleteUserData: deleteUserData,
                    listUserForms: listUserForms
                }}
            />
        </div>
    );

};

export default Content;