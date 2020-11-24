import React, { useEffect, useState } from 'react'
import { AnswerData, BatchCreatedQuestionAnswer, ContentProps, FormDefinition, ListedFormDefinition, UserAnswer, UserFormCreated, UserFormList, UserFormWithAnswers } from '../types'
import * as helper from '../helperFunctions'
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as customQueries from '../graphql/custom-queries';
import { Overview } from './cards/Overview';
import { ScaleDescription } from './cards/ScaleDescription';
import { YourAnswers } from './cards/YourAnswers';
import { CardStyle } from '../styles';
import { AnswerHistory } from './AnswerHistory';

const Content = ({...props}: ContentProps) => {
    
    const [answers, setAnswers] = useState<AnswerData[]>([]);
    const [formDefinition, setFormDefinition] = useState<FormDefinition | null>(null);
    const [radarData, setRadarData] = useState<AnswerData[]>([]);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]); //Used only for getting data on load
    const [submitFeedback, setSubmitFeedback] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("dkjfgdrjkg");
    const [isAnswersSubmitted, setIsAnswersSubmitted] = useState<boolean>(false);
    const [answersBeforeSubmitted, setAnswersBeforeSubmitted] = useState<AnswerData[]>([]);
    const [historyViewOpen, setHistoryViewOpen] = useState<boolean>(false);
    const [answerLog, setAnswerLog] = useState<UserFormWithAnswers[]>([]);

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
        setIsAnswersSubmitted(true)
        setAnswersBeforeSubmitted(JSON.parse(JSON.stringify(answers)));
        answerViewModeActive(true);
      
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
        if(!result || result.length === 0) {
            setSubmitFeedback("Something went wrong when inserting data to server database..");
            return;
        }
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
        if(currentForm.data){

            let sorted = currentForm.data.getFormDefinition.questions.items
                .sort((a,b) => (a.question.index < b.question.index) ? -1 : 1);

            currentForm.data.getFormDefinition.questions.items = sorted;

            setFormDefinition(currentForm.data);
        } 
    };

    const getUserAnswers = async () => {
        let allAnswers = await helper.listUserForms();
        if(allAnswers.length === 0) return;
        let lastUserAnswer = (helper.getLastItem(allAnswers))?.questionAnswers.items;
        if(lastUserAnswer) setUserAnswers(lastUserAnswer);
    };

    const changeActiveCategory = (newActiveCategory: string) => {
        setActiveCategory(newActiveCategory);
        answerViewModeActive(true);
    };

    const fetchUserFormsAndOpenView = async () => {
        let allUserForms = await helper.listUserForms();
        setAnswerLog(allUserForms);
        setHistoryViewOpen(true);
    };

    const resetAnswers = () => {
        setAnswers(JSON.parse(JSON.stringify(answersBeforeSubmitted))) // json.parse to deep copy
    }

    useEffect(() => {
        changeActiveCategory(categories[0]);
    }, [categories]);
    
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

        setAnswersBeforeSubmitted(JSON.parse(JSON.stringify(answers)));
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

    useEffect(() => {
        if (props.answerHistoryOpen) {
            fetchUserFormsAndOpenView() 
        } else {
            setHistoryViewOpen(false);
        }
    }, [props.answerHistoryOpen]);

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
    const style = CardStyle({zIndex: 0});
    
    const answerViewModeActive = (viewModeActive: boolean) => {
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
                resetAnswers={resetAnswers}
                // updateSliderValues={updateSliderValues}
                // setUpdateSliderValues={updateSliderValues}
                answerViewModeActive={answerViewModeActive}
                answerViewMode={answerViewMode}
            />
            <AnswerHistory
                setHistoryViewOpen={props.setAnswerHistoryOpen}
                historyViewOpen={historyViewOpen}
                history={answerLog}
                formDefinition={formDefinition ?? undefined}
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