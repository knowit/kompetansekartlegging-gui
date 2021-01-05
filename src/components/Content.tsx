import React, { useEffect, useState } from 'react';
import { AnswerData, ContentProps, FormDefinition, FormDefinitionByCreatedAt, UserAnswer, UserFormWithAnswers, UserFormByCreatedAt, UserForm, CreateQuestionAnswerResult } from '../types';
import * as helper from '../helperFunctions';
import * as customQueries from '../graphql/custom-queries';
import { Overview } from './cards/Overview';
import { ScaleDescription } from './cards/ScaleDescription';
import { YourAnswers } from './cards/YourAnswers';
import { CreateQuestionAnswerInput } from '../API';
import { AnswerHistory } from './AnswerHistory';
import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { KnowitColors } from '../styles';
import { AlertDialog } from './AlertDialog';

const cardCornerRadius: number = 40;

export enum MenuButton {
    Overview,
    MyAnswers,
    Category
}

export enum Panel {
    Overview,
    MyAnswers,
    ScaleDescription,
    None
};

export const contentStyleDesktop = makeStyles({
    cardHolder: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%'
    },
});

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
        width: '20%',
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
    menuButtonText: {
        fontSize: 15,
        textAlign: 'left',
        width: '100%',
        marginLeft: 10,
        fontWeight: 'bold'
    },
    menuButtonCategoryText: {
        fontSize: 12,
        marginLeft: 20
    },
    hideCategoryButtons: {
        display: 'none'  
    },
    panel: {
        background: KnowitColors.white,
        height: '100%',
        width: '80%'
    }
});

const Content = ({...props}: ContentProps) => {
    
    const [answers, setAnswers] = useState<AnswerData[]>([]);
    const [formDefinition, setFormDefinition] = useState<FormDefinition | null>(null);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]); //Used only for getting data on load
    const [submitFeedback, setSubmitFeedback] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("dkjfgdrjkg");
    const [isCategorySubmitted, setIsCategorySubmitted] = useState<boolean>(true);
    const [answersBeforeSubmitted, setAnswersBeforeSubmitted] = useState<AnswerData[]>([]);
    const [historyViewOpen, setHistoryViewOpen] = useState<boolean>(false);
    const [answerLog, setAnswerLog] = useState<UserFormWithAnswers[]>([]);
    const [activePanel, setActivePanel] = useState<Panel>(Panel.Overview);
    const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);

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
    
    const createUserForm = async () => {
        setIsCategorySubmitted(true)
        setAnswersBeforeSubmitted(JSON.parse(JSON.stringify(answers)));
        setAnswerViewModeActive(true);
      
        setSubmitFeedback("Sending data to server...");
        if(!formDefinition) return;
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
    }

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
        if (isCategorySubmitted) {
            setIsCategorySubmitted(false)
        }
    }, [isCategorySubmitted]);

    useEffect(() => {
        if (props.answerHistoryOpen) {
            fetchUserFormsAndOpenView() 
        } else {
            setHistoryViewOpen(false);
        }
    }, [props.answerHistoryOpen]);

    
    
    
    
    

    const [answerViewMode, setAnswerViewMode] = useState<boolean>(true);
    const [lastButtonClicked, setLastButtonClicked] = useState<{ buttonType: MenuButton, category?: string }>({ //Custom type might better be moved to type variable
        buttonType: MenuButton.Overview,
        category: undefined
    });
    const style = contentStyle();
    const mobileStyle = contentStyleMobile();
    
    const setAnswerViewModeActive = (viewModeActive: boolean) => {
        setAnswerViewMode(viewModeActive);
    };
    
    const checkIfCategoryIsSubmitted = (buttonType: MenuButton, category?: string) => {
        if (isCategorySubmitted) {
            menuButtonClick(buttonType, category);
        } else {
            setLastButtonClicked({
                buttonType: buttonType,
                category: category
            });
            console.log(lastButtonClicked);
            setAlertDialogOpen(true);
        }
    };
    
    const leaveFormButtonClicked = () => {
        // console.log("Leave button clicked", lastButtonClicked);
        setAlertDialogOpen(false);
        menuButtonClick(lastButtonClicked.buttonType, lastButtonClicked.category);
    }
    
    //TODO: Remove this function when refactor is done. Needed to not change mobile too much for now
    const dummyFunctionForRefactor = () => {
        return;
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
    
    const displayActivePanel = (buttonType: MenuButton): string => {
        switch(buttonType){
            case MenuButton.Overview:
                return activePanel === Panel.Overview ? style.menuButtonActive : "";
            case MenuButton.MyAnswers:
                return activePanel === Panel.MyAnswers ? style.menuButtonActive : "";
        };
        return "";
    };
    
    const setupMenu = (): JSX.Element[] => {
        let buttons: JSX.Element[] = [];
        ["OVERSIKT", "MINE SVAR", "JIB!", "Sleep", "Test :D", "Fancy array magic"].forEach((text, index) => {
            buttons.push(
                <Button
                    key={text.toLocaleLowerCase()}
                    className={clsx(style.menuButton, displayActivePanel(index))}
                    onClick={() => { checkIfCategoryIsSubmitted(index)}}>
                    <div className={clsx(style.menuButtonText)}>{text}</div>
                </Button>
            );
        });
        let categoryButtons: JSX.Element[] = categories.map((category, index) => {
            return <Button
                key={category}
                className={clsx(style.menuButton, activeCategory === category ? style.menuButtonActive : "",
                    activePanel === Panel.MyAnswers ? "" : style.hideCategoryButtons)}
                onClick={() => { checkIfCategoryIsSubmitted(MenuButton.Category, category) }}>
                <div className={clsx(style.menuButtonText, style.menuButtonCategoryText)}>{index + 1}. {category}</div>
            </Button>
        });
        buttons.splice(2, 0, ...categoryButtons);
        return buttons;
    };
    
    //TODO: Remove commonCardProps from desktop version (keep for mobile for now)
    const setupPanel = (): JSX.Element => {
        switch (activePanel) {
            case Panel.Overview:
                return(
                    <Overview
                        commonCardProps={{
                            activePanel: activePanel
                            // setActiveCard: setActiveCard,
                            // active: activeCards[0],
                            // index: 0
                        }}
                        answers={answers}
                        isMobile={props.isMobile}
                        isOverViewOpen={props.isOverViewOpen}
                    />
                );
            case Panel.MyAnswers:
                return(
                    <YourAnswers
                        commonCardProps={{
                            activePanel: activePanel
                            // setActiveCard: setActiveCard,
                            // active: activeCards[2],
                            // index: 2
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
                <AlertDialog
                    setAlertDialogOpen={setAlertDialogOpen}
                    alertDialogOpen={alertDialogOpen}
                    changeActiveCategory={dummyFunctionForRefactor}//setActiveCategory}
                    clickedCategory={activeCategory}
                    setIsCategorySubmitted={setIsCategorySubmitted}
                    resetAnswers={resetAnswers}
                    leaveFormButtonClicked={leaveFormButtonClicked} //Temp added here, replace changeActiveCategory
                    isMobile={props.isMobile}
                />
            </div>
        :
            <div className={mobileStyle.cardHolder}>
                <Overview 
                    commonCardProps={{
                        activePanel: activePanel
                        // setActiveCard: setActiveCard,
                        // active: activeCards[0],
                        // index: 0
                    }}
                    answers={answers}
                    isMobile={props.isMobile}
                    isOverViewOpen={props.isOverViewOpen}

                />
                <ScaleDescription 
                    commonCardProps={{
                        activePanel: activePanel
                        // setActiveCard: setActiveCard,
                        // active: activeCards[1],
                        // index: 1
                    }}
                    isMobile={props.isMobile}
                    isScaleDescriptionOpen={props.isScaleDescriptionOpen}

                />
                <YourAnswers 
                    commonCardProps={{
                        activePanel: activePanel
                        // setActiveCard: setActiveCard,
                        // active: activeCards[2],
                        // index: 2
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