import React, { useEffect, useState } from 'react'
import { AnswerData, BatchCreatedQuestionAnswer, FormDefinition, ListedFormDefinition, UserAnswer, UserFormCreated, UserFormList, UserFormWithAnswers } from '../types'
import * as helper from '../helperFunctions'
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as customQueries from '../graphql/custom-queries';
import { Overview } from './cards/Overview';
import { ScaleDescription } from './cards/ScaleDescription';
import { YourAnswers } from './cards/YourAnswers';
import { CardStyle } from '../styles';

const Content = () => {
    
    const [answers, setAnswers] = useState<AnswerData[]>([]);
    const [formDefinition, setFormDefinition] = useState<FormDefinition | null>(null);
    const [radarData, setRadarData] = useState<AnswerData[]>([]);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]); //Used only for getting data on load
    const [submitFeedback, setSubmitFeedback] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("dkjfgdrjkg");
    const [isAnswersSubmitted, setIsAnswersSubmitted] = useState<boolean>(false);
    const [loadDataFirstTime, setLoadDataFirstTime] = useState<boolean>(false);

    const createCategories = () => {
        if(!formDefinition) return [];
        let formDef = formDefinition.getFormDefinition;
        if(!formDef?.questions.items) return [];
        return formDef.questions.items
            .map(item => item.question.category)
            .filter((value, index, array) => array.indexOf(value) === index);
    };

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

    const createRadarData = (): AnswerData[] => {

        if(!formDefinition) return [];
        let questionList = formDefinition.getFormDefinition.questions.items;
        if(!answers || !questionList) return [];
        let newRadarData: AnswerData[] = [];
        for (let i = 0; i < answers.length; i++) {
            newRadarData.push({
                questionId: answers[i].questionId,
                category: answers[i].category,
                topic: answers[i].topic,
                knowledge: answers[i].knowledge,
                motivation: answers[i].motivation
            });
        }
        return newRadarData;
    };
    
    const createUserForm = async () => {
        // todo: skal denne her?
        setIsAnswersSubmitted(true);
        setAnswerViewMode(true);
        
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
        let result = (await helper.callBatchGraphQL<BatchCreatedQuestionAnswer>(mutations.batchCreateQuestionAnswer, {input: questionAnswers}, "QuestionAnswer"));
        if(!result) {
            setSubmitFeedback("Something went wrong when inserting data to server database..");
            return;
        }
        console.log(result);
        setSubmitFeedback("Your answers has been saved!");
        //updateRadarData(result);
    }

    // const updateRadarData = (batchData: BatchCreatedQuestionAnswer): void => {
    //     let data = batchData.batchCreateQuestionAnswer;
    //     let newRadarData: AnsweredQuestion[] = [...radarData];
    //     for(let i = 0; i < data.length; i++){
    //         let rData = newRadarData.find(d => d.question.id === data[i].question.id);
    //         if(rData) rData.answer = data[i].answer;
    //     }
    //     setRadarData(newRadarData);
    // }

    const updateAnswer = (questionId: string, knowledgeValue: number, motivationValue: number): void => {
        setAnswers(prevAnswers => {
            let newAnswers: AnswerData[] = [...prevAnswers];
            let answer = newAnswers.find(a => a.questionId === questionId);
            if(!answer) return [];
            answer.knowledge = knowledgeValue;
            answer.motivation = motivationValue;
            return newAnswers
        });
    };

    const fetchLastFormDefinition = async () => {
        let formList = await helper.callGraphQL<ListedFormDefinition>(queries.listFormDefinitions);
        let lastForm = await helper.getLastItem(formList.data?.listFormDefinitions.items);
        let currentForm = await helper.callGraphQL<FormDefinition>(customQueries.getFormDefinitionWithQuestions, {id: lastForm?.id})
        if(currentForm.data) setFormDefinition(currentForm.data);
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
    };

    const changeActiveCategory = (newActiveCategory: string) => {
        // console.log("New category: " + newActiveCategory);
        setActiveCategory(newActiveCategory);
    };

    useEffect(() => {
        changeActiveCategory(categories[0]);
    }, [categories]);

    // useEffect(() => {
    //     console.log(activeCategory);
    // }, [activeCategory]);
    
    useEffect(() => {
        fetchLastFormDefinition();
        setSubmitFeedback("");
    }, []);

    useEffect(() => {
        getUserAnswers();
        setAnswers(createAnswers());
        setCategories(createCategories());
    }, [formDefinition]);

    useEffect(() => {
        setAnswers(createAnswers());
    }, [userAnswers]);

    useEffect(() => {
        if(radarData.length === 0) setRadarData(createRadarData());
        else if (isAnswersSubmitted) {
            setRadarData(answers);
            setIsAnswersSubmitted(false)
        }
    }, [userAnswers, isAnswersSubmitted]);

    useEffect(() => {
        if(radarData.length > 0) {
            setIsAnswersSubmitted(true)
        } 
    }, [radarData]);

    //New States etc for new card functionality
    /*
     * Really cryptic, using array for storing if card is active or not, using hardcoded number
     *  for index. this rly need another look and a fix to make it readable
     *
     * Indexes is mapped to Cards like this:
     * 0 = Overview, 1 = ScaleDescription, 2 = YourAnswers
    */
    const [activeCards, setActiveCards] = useState<boolean[]>([true, false, true]);
    const [answerViewMode, setAnswerViewMode] = useState<boolean>(true);
    const style = CardStyle();
    
    const changeAnswerViewMode = (viewModeActive: boolean) => {
        setAnswerViewMode(viewModeActive);
    };
    
    const setActiveCard = (cardIndex: number, active: boolean) => {
        let newActiveCards = [...activeCards];
        if(cardIndex === 0 && newActiveCards[1]) newActiveCards[2] = false;
        if(cardIndex === 2 && newActiveCards[1]) newActiveCards[0] = false;
        if(cardIndex === 1 && newActiveCards[0] && newActiveCards[2]) newActiveCards[0] = false;
        newActiveCards[cardIndex] = active;
        setActiveCards(newActiveCards);
    };

    
    return (
        <div className={style.cardHolder}>
            <Overview 
                commonCardProps={{
                    setActiveCard: setActiveCard,
                    active: activeCards[0],
                    index: 0
                }}
                radarData={radarData}
                isAnswersSubmitted={isAnswersSubmitted}
            />
            <ScaleDescription 
                commonCardProps={{
                    setActiveCard: setActiveCard,
                    active: activeCards[1],
                    index: 1
                }}
            />
            <YourAnswers 
                commonCardProps={{
                    setActiveCard: setActiveCard,
                    active: activeCards[2],
                    index: 2
                }}
                createUserForm={createUserForm}
                updateAnswer={updateAnswer}
                formDefinition={formDefinition}
                answers={answers}
                submitFeedback={submitFeedback}
                changeActiveCategory={changeActiveCategory}
                categories={categories}
                activeCategory={activeCategory}
                changeAnswerViewMode={changeAnswerViewMode}
                answerViewMode={answerViewMode}
            />
        </div>
    );

    // return(
    //     <div>
    //         <Router  
    //             answerProps={{
    //                 updateAnswer: updateAnswer,
    //                 formDefinition: formDefinition,
    //                 createUserForm: createUserForm,
    //                 answers: answers,
    //                 submitFeedback: submitFeedback
    //             }}
    //             statsProps={{
    //                 data: radarData
    //             }}
    //             userProps={{
    //                 deleteUserData: deleteUserData,
    //                 listUserForms: listUserForms
    //             }}
    //         />
    //     </div>
    // );

};

export default Content;