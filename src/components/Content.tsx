import React, { useEffect, useState } from 'react'
import { AnswerData, ContentProps, FormDefinition, FormDefinitionByCreatedAt, UserAnswer, UserFormWithAnswers, UserFormByCreatedAt, UserForm, CreateQuestionAnswerResult } from '../types'
import * as helper from '../helperFunctions'
import * as customQueries from '../graphql/custom-queries';
import { Overview } from './cards/Overview';
import { ScaleDescription } from './cards/ScaleDescription';
import { YourAnswers } from './cards/YourAnswers';
import { CreateQuestionAnswerInput } from '../API';
import { AnswerHistory } from './AnswerHistory';
import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { KnowitColors } from '../styles';

const cardCornerRadius: number = 40;
const zIndex: number = 0;

enum MenuButton {
    Overview,
    MyAnswers,
    Category
}

export enum Panel {
    Overview,
    MyAnswers,
    None
};

export const contentStyleDesktop = makeStyles({
    cardHolder: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%'
    },
})

export const contentStyleMobile = makeStyles({
    cardHolder: {
        display: 'flex',
        // flexDirection: 'column',
        // overflow: 'scroll',
        height: '100%'
    },
});

const contentStyle = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden'
    },
    menu: {
        background: KnowitColors.beige,
        width: '15%',
        height: 'max-content',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0px 0px 30px 0px',
        boxShadow: "0px 4px 4px 2px lightgrey",
    },
    menuButton: {
        borderTopLeftRadius: cardCornerRadius,
        borderBottomLeftRadius: cardCornerRadius,
        '&:hover': {
            background: KnowitColors.white
        },
    },
    menuButtonActive: {
        background: KnowitColors.white,
    },
    hideCategoryButtons: {
        display: 'none'  
    },
    panel: {
        background: KnowitColors.white,
        height: '100%',
        width: '85%'
    },
});

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
    const [activePanel, setActivePanel] = useState<Panel>(Panel.Overview);

    const createCategories = () => {
        if(!formDefinition) return [];
        if(!formDefinition?.questions.items) return [];
        return formDefinition.questions.items
            .map(item => item.category.text)
            .filter((value, index, array) => array.indexOf(value) === index);
    };

    const createAnswers = (): AnswerData[] => {
        if(!formDefinition) return [];
        let as: AnswerData[] = [];
        if(formDefinition?.questions.items){
            console.log(userAnswers);
            for (let i = 0; i < formDefinition.questions.items.length; i++) {
                const question = formDefinition.questions.items[i];
                // console.log(question);
                if (!question) continue;
                let preAnswer = userAnswers.find(answer => answer.question.id === question.id);
                as.push({
                    questionId: question.id,
                    topic: question.topic,
                    category: question.category.text,
                    knowledge: preAnswer ? (preAnswer.knowledge ? preAnswer.knowledge : 0) : -1,
                    motivation: preAnswer ? (preAnswer.motivation ? preAnswer.motivation : 0) : -1
                });
            }
        }
        console.log(as);
        return as;
    };

    const createRadarData = (): AnswerData[] => {

        if(!formDefinition) return [];
        let questionList = formDefinition.questions.items;
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
        setAnswerViewModeActive(true);
      
        setSubmitFeedback("Sending data to server...");
        if(!formDefinition) return;
        let fdid = formDefinition.id;
        // let userForm: UserFormCreated | undefined = (await helper.callGraphQL<UserFormCreated>(mutations.createUserForm, {input: {"formDefinitionID": fdid}})).data;
        // console.log(userForm);
        if(!answers) return;
        let questionAnswers: CreateQuestionAnswerInput[] = [];
        for(let i = 0; i < answers.length; i++){
            if(answers[i].knowledge < 0 && answers[i].motivation < 0) continue;
            questionAnswers.push({
                userFormID: "",
                questionID: answers[i].questionId,
                knowledge: answers[i].knowledge,
                motivation: answers[i].motivation,
                environmentID: helper.getEnvTableID(),
                formDefinitionID: formDefinition.id.toString()
            });
        }

        // Ensures diagram data is updated on first submit
        if (radarData.length === 0) setRadarData(createRadarData());

        console.log(questionAnswers);
        
        //TODO: Use result to update: Remember that result is now an array, which must be looped.
        // let result = (await helper.callBatchGraphQL<BatchCreatedQuestionAnswer>(mutations.batchCreateQuestionAnswer, {input: questionAnswers}, "QuestionAnswer"));
        // let result = (await helper.callBatchGraphQL2(mutations.batchCreateQuestionAnswer, {input: questionAnswers}, "QuestionAnswer"));
        let result = (await helper.callBatchGraphQL<CreateQuestionAnswerResult>(customQueries.batchCreateQuestionAnswer2, {input: questionAnswers}, "QuestionAnswer")).map(result => result.data?.batchCreateQuestionAnswer);
        console.log("Result: ", result);
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
        let currentForm = await helper.callGraphQL<FormDefinitionByCreatedAt>(customQueries.formByCreatedAtt, customQueries.formByCreatedAtInputConsts);
        // let lastForm = await helper.getLastItem(formList.data?.listFormDefinitions.items);
        // let currentForm = await helper.callGraphQL<FormDefinition>(customQueries.getFormDefinitionWithQuestions, {id: lastForm?.id})
        // console.log("Current form: ", currentForm);
        if(currentForm.data){

            //TODO: Need to sort questions again, currently removed but can be implemented

            // currentForm.data.formByCreatedAt.items[0].questions
            // let sorted = currentForm.data.formByCreatedAt.items[0].questions.items
            //     .sort((a,b) => (a.question.index < b.question.index) ? -1 : 1);

            // currentForm.data.getFormDefinition.questions.items = sorted;


            setFormDefinition(currentForm.data.formByCreatedAt.items[0]);
        } 
    };

    const getUserAnswers = async () => {
        // let allAnswers = await helper.listUserForms();
        // console.log(allAnswers);
        // if(allAnswers.length === 0) return;
        // let lastUserAnswer = (helper.getLastItem(allAnswers))?.questionAnswers.items;
        if(!props.user) return console.error("User not found when getting useranswers");
        let lastUserForm: UserForm | undefined = (await helper.callGraphQL<UserFormByCreatedAt>
            (customQueries.customUserFormByCreatedAt, {...customQueries.userFormByCreatedAtInputConsts, owner: props.user.username})).data?.userFormByCreatedAt.items[0];
        if(lastUserForm) setUserAnswers(lastUserForm.questionAnswers.items);
        console.log("Last userform: ", lastUserForm);
    };

    const changeActiveCategory = (newActiveCategory: string) => {
        setActiveCategory(newActiveCategory);
        setAnswerViewModeActive(true);
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
    const style = contentStyle();
    const mobileStyle = contentStyleMobile();

    
    const setAnswerViewModeActive = (viewModeActive: boolean) => {
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
    
    const saveBeforeChange = (cat: string) => {
        // if (!isCategorySubmitted) {
        //     setAlertDialogOpen(true)
        //     setClickedCategory(cat)
        // } else {
        //     props.changeActiveCategory(cat)
        // }
    };
    
    
    
    const menuButtonClick = (buttonType: MenuButton, category?: string) => {
        // console.log("Button clicked ", buttonType, category);
        switch(buttonType){
            case MenuButton.Overview:
                setActivePanel(Panel.Overview);
                break;
            case MenuButton.MyAnswers:
                setActivePanel(Panel.MyAnswers);
                break;
            case MenuButton.Category:
                setActiveCategory(category || "");
                break;
        }
    };
    
    const setupMenu = (): JSX.Element[] => {
        let buttons: JSX.Element[] = [];
        buttons.push(
            <Button
                key={"oversikt"}
                className={clsx(style.menuButton, activePanel === Panel.Overview ? style.menuButtonActive : "")}
                onClick={() => {menuButtonClick(MenuButton.Overview)}}><div className={""}>OVERSIKT</div>
            </Button>
        );
        buttons.push(
            <Button
                key={"minesvar"}
                className={clsx(style.menuButton, activePanel === Panel.MyAnswers ? style.menuButtonActive : "")}
                onClick={() => {menuButtonClick(MenuButton.MyAnswers)}}>
            <div>MINE SVAR</div>
            </Button>
        );
        let orderNumber: number = 1;
        categories.forEach(cat => {
            buttons.push(
                <Button
                    key={cat}
                    className={clsx(style.menuButton, activeCategory === cat ? style.menuButtonActive : "",
                        activePanel === Panel.MyAnswers ? "" : style.hideCategoryButtons)}
                    onClick={() => {menuButtonClick(MenuButton.Category, cat)}}>
                <div>{orderNumber}. {cat}</div>
                </Button>
            );
            orderNumber++;
        });
        return buttons;
    };
    
    //TODO: Remove commonCardProps from desktop version (keep for mobile for now)
    const setupPanel = (): JSX.Element => {
        switch (activePanel) {
            case Panel.Overview:
                return(
                    <Overview
                        commonCardProps={{
                            setActiveCard: setActiveCard,
                            active: activeCards[0],
                            index: 0
                        }}
                        radarData={radarData}
                        isMobile={props.isMobile}
                        isOverViewOpen={props.isOverViewOpen}
                    />
                );
            case Panel.MyAnswers:
                return(
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
                        setAnswerViewModeActive={setAnswerViewModeActive}
                        answerViewMode={answerViewMode}
                        isMobile={props.isMobile}
                        isOverViewOpen={props.isOverViewOpen}
                        isScaleDescriptionOpen={props.isScaleDescriptionOpen}
                        isYourAnswersOpen={props.isYourAnswersOpen}
                    />
                );
        }
        return <div></div>;
    };
    
    return (
        !props.isMobile ?
            <div className={style.root}>
                <div className={style.menu}>{setupMenu()}</div>
                <div className={style.panel}>{setupPanel()}</div>
            </div>
        :
            <div className={mobileStyle.cardHolder}>
                <Overview 
                    commonCardProps={{
                        setActiveCard: setActiveCard,
                        active: activeCards[0],
                        index: 0
                    }}
                    radarData={radarData}
                    isMobile={props.isMobile}
                    isOverViewOpen={props.isOverViewOpen}

                />
                <ScaleDescription 
                    commonCardProps={{
                        setActiveCard: setActiveCard,
                        active: activeCards[1],
                        index: 1
                    }}
                    isMobile={props.isMobile}
                    isScaleDescriptionOpen={props.isScaleDescriptionOpen}

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
                    setAnswerViewModeActive={setAnswerViewModeActive}
                    answerViewMode={answerViewMode}
                    isMobile={props.isMobile}
                    isOverViewOpen={props.isOverViewOpen}
                    isScaleDescriptionOpen={props.isScaleDescriptionOpen}
                    isYourAnswersOpen={props.isYourAnswersOpen}
                />
                <AnswerHistory
                    setHistoryViewOpen={props.setAnswerHistoryOpen}
                    historyViewOpen={historyViewOpen}
                    history={answerLog}
                    formDefinition={formDefinition ?? undefined}
                    isMobile={props.isMobile}
                />
            </div>
    );
};

export default Content;