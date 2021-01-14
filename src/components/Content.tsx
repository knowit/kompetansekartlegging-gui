import React, { Fragment, useEffect, useRef, useState } from 'react';
import { AnswerData, ContentProps, FormDefinition, FormDefinitionByCreatedAt, UserAnswer, UserFormWithAnswers, UserFormByCreatedAt, UserForm, CreateQuestionAnswerResult, AlertState , Alert } from '../types';
import * as helper from '../helperFunctions';
import * as customQueries from '../graphql/custom-queries';
import { Overview } from './cards/Overview';
import { ScaleDescription } from './cards/ScaleDescription';
import { YourAnswers } from './cards/YourAnswers';
import { CreateQuestionAnswerInput } from '../API';
import { AnswerHistory } from './AnswerHistory';
import { Button, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { KnowitColors } from '../styles';
import { AlertDialog } from './AlertDialog';
import { AlertNotification, AlertType } from './AlertNotification';
import NavBarMobile from './NavBarMobile';

const cardCornerRadius: number = 40;

const staleAnswersLimit: number = helper.Millisecs.FIVEMINUTES;

export enum Panel {
    Overview,
    MyAnswers,
    GroupLeader,
    ScaleDescription,
    Other,
    None
};

export enum MenuButton {
    Overview,
    MyAnswers,
    Category,
    GroupLeader,
    LeaderCategory,
    Other
}

export const contentStyleDesktop = makeStyles({
    cardHolder: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%'
    },
});

export const contentStyleMobile = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        height: '100%'
    },
    panel: {
        background: KnowitColors.white,
        height: '100%',
        width: '100%',
        marginTop: 56
    }
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
    MenuButton: {
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
    const [answersBeforeSubmitted, setAnswersBeforeSubmitted] = useState<AnswerData[]>([]);
    const [historyViewOpen, setHistoryViewOpen] = useState<boolean>(false);
    const [answerLog, setAnswerLog] = useState<UserFormWithAnswers[]>([]);
    const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
    const [isCategorySubmitted, setIsCategorySubmitted] = useState<boolean>(true);
    const [activePanel, setActivePanel] = useState<Panel>(Panel.Overview);
    const [activeCategory, setActiveCategory] = useState<string>("dkjfgdrjkg");
    const [answerEditMode, setAnswerEditMode] = useState<boolean>(false);
    const [alerts, setAlerts] = useState<AlertState>();

    const updateCategoryAlerts = () => {
        let msNow = Date.now();
        let alerts = new Map<string, Alert>();
        let catAlerts = new Map<string, number>();
        for (let answer of answers) {
            if (answer.motivation  === -1 || answer.knowledge === -1) {
                alerts.set(answer.questionId, {type: AlertType.Incomplete, message: "Ubesvart!"});
                let numAlerts = catAlerts.get(answer.category);
                if (numAlerts)
                    catAlerts.set(answer.category, numAlerts + 1);
                else
                    catAlerts.set(answer.category, 1);
            } else if (msNow - answer.updatedAt > staleAnswersLimit) {
                alerts.set(answer.questionId, {
                    type: AlertType.Outdated,
                    message: `Bør oppdateres! Sist besvart: ${
                        new Date(answer.updatedAt)  //.toLocaleDateString('no-NO')
                    }`
                });
                let numAlerts = catAlerts.get(answer.category);
                if (numAlerts)
                    catAlerts.set(answer.category, numAlerts + 1);
                else
                catAlerts.set(answer.category, 1);
            }
        }
        setAlerts({qidMap: alerts, categoryMap: catAlerts});
    }

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
                    motivation: preAnswer ? (preAnswer.motivation ? preAnswer.motivation : 0) : -1,
                    updatedAt: preAnswer ? Date.parse(preAnswer.updatedAt) : 0
                });
            }
        }
        return as;
    };
    
    const createUserForm = async () => {
        setIsCategorySubmitted(true)
        setAnswersBeforeSubmitted(JSON.parse(JSON.stringify(answers)));
        setAnswerEditMode(false);
      
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
            answer.updatedAt = Date.now();
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
        setAnswerEditMode(false);
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
        console.log("formDefinition")

        getUserAnswers();
        setAnswers(createAnswers());
        setCategories(createCategories());
    }, [formDefinition]);

    useEffect(() => {
        console.log("categories")
        setActiveCategory(categories[0]);
        setAnswerEditMode(false);
    }, [categories]);

    useEffect(() => {
        console.log("answers")

        updateCategoryAlerts();
    }, [answers]);
    
    useEffect(() => {
        console.log("INITIAL1")

        fetchLastFormDefinition();
        setSubmitFeedback("");
    }, []);

    

    useEffect(() => {
        console.log("userAnswers")

        setAnswers(createAnswers());

        setAnswersBeforeSubmitted(JSON.parse(JSON.stringify(answers)));
    }, [userAnswers]);

    useEffect(() => {
        console.log("props.answerHistoryOpen")

        if (props.answerHistoryOpen) {
            fetchUserFormsAndOpenView() 
        } else {
            setHistoryViewOpen(false);
        }
    }, [props.answerHistoryOpen]);

    useEffect(() => {
        console.log("isCategorySubmitted")

        window.onbeforeunload = confirmExit;
        function confirmExit() {
            if (!isCategorySubmitted) {
                return "show warning";
            }
        }
    }, [isCategorySubmitted])
    
    
    
    

    const [lastButtonClicked, setLastButtonClicked] = useState<{ buttonType: MenuButton, category?: string }>({ //Custom type might better be moved to type variable
        buttonType: MenuButton.Overview,
        category: undefined
    });
    
    const style = contentStyle();
    const mobileStyle = contentStyleMobile();
    
    //TODO: Remove this function when refactor is done. Needed to not change mobile too much for now
    const dummyFunctionForRefactor = () => {
        return;
    };

    const checkIfCategoryIsSubmitted = (buttonType: MenuButton, category?: string) => {
        if (isCategorySubmitted) {
            menuButtonClicked(buttonType, category);
        } else {
            setLastButtonClicked({
                buttonType: buttonType,
                category: category
            });
            // console.log(lastButtonClicked);
            setAlertDialogOpen(true);
        }
    };
    
    const leaveFormButtonClicked = () => {
        // console.log("Leave button clicked", lastButtonClicked);
        setAlertDialogOpen(false);
        setIsCategorySubmitted(true);
        resetAnswers();
        menuButtonClicked(lastButtonClicked.buttonType, lastButtonClicked.category);
    };
    
    const menuButtonClicked = (buttonType: MenuButton, category?: string) => {
        // console.log("Button clicked ", buttonType, category);
        switch (buttonType) {
            case MenuButton.Overview:
                setActivePanel(Panel.Overview);
                break;
            case MenuButton.MyAnswers:
                setActivePanel(Panel.MyAnswers);
                if (category) setActiveCategory(category);
                break;
            case MenuButton.Category:
                setActiveCategory(category || "");
                setAnswerEditMode(false);
                break;
            case MenuButton.GroupLeader:
                setActivePanel(Panel.GroupLeader);
                if (category) setActiveCategory(category);
                break;
            case MenuButton.LeaderCategory:
                setActiveCategory(category || "");
                break;
            case MenuButton.Other:
                setActivePanel(Panel.Other);
                console.log("Other button pressed", category);
                break;
        }
    };
    
    const keepButtonActive = (buttonType: MenuButton): string => {
        switch(buttonType){
            case MenuButton.Overview:
                return activePanel === Panel.Overview ? style.menuButtonActive : "";
            case MenuButton.MyAnswers:
                return activePanel === Panel.MyAnswers ? style.menuButtonActive : "";
            case MenuButton.GroupLeader:
                return activePanel === Panel.GroupLeader ? style.menuButtonActive : "";
        };
        return "";
    };


    const getTotalAlertsElement = (): JSX.Element => {
        let totalAlerts = 0;
        alerts?.categoryMap.forEach((numAlerts: number, category: string) => {
            totalAlerts += numAlerts;
        });
        if (totalAlerts > 0)
            return <AlertNotification
                type={AlertType.Multiple}
                message="Totalt ubesvarte eller utdaterte spørsmål"
                size={totalAlerts}
                />;
        else
            return <Fragment/>;
    }

    /**
         *  Setup for the button array structure:
         * 
         *  text: string - The text on the button
         *  buttonType: MenuButton - The type of button it is
         *  subButtons: Array of Objects - Only define if having sub buttons (like categories for answers)
         *      subButton's Objects: text: string - The tet of the button (index is added in front automaticly)
         *                           buttonType: MenuButton - The type of button it is, not same as 'parent'
         *                           activePanel: Panel - What panel is needed to be active for this button to show up
         * 
         *  NOTE: Active panel should be changed somehow to instead check if parent button is active or not
         */
    const buttonSetup = [
        { text: "Oversikt", buttonType: MenuButton.Overview },
        { text: "Mine Svar", buttonType: MenuButton.MyAnswers, subButtons: categories.map((cat) => {
                return { text: cat, buttonType: MenuButton.Category, activePanel: Panel.MyAnswers }
            })
        },
        { text: "Test", buttonType: MenuButton.Other },
        { text: "Parent", buttonType: MenuButton.GroupLeader, subButtons: [
            { text: "Child 1", buttonType: MenuButton.LeaderCategory, activePanel: Panel.GroupLeader },
            { text: "Child 2", buttonType: MenuButton.LeaderCategory, activePanel: Panel.GroupLeader },
            { text: "Child 3", buttonType: MenuButton.LeaderCategory, activePanel: Panel.GroupLeader },
        ]},
    ]


    const setupDesktopMenu = (): JSX.Element[] => {
        let buttons: JSX.Element[] = [];
        
        buttonSetup.forEach((butt) => {
            buttons.push(
                <Button
                    key={butt.text}
                    className={clsx(style.MenuButton, keepButtonActive(butt.buttonType))}
                    onClick={() => { checkIfCategoryIsSubmitted(butt.buttonType, undefined)}}
                >
                        <div className={clsx(style.menuButtonText)}>{butt.text}</div>
                        {(butt.buttonType === MenuButton.MyAnswers) ? getTotalAlertsElement() : ""}
                </Button>
            );
            if(butt.subButtons){
                butt.subButtons.forEach((butt, index) => {
                    buttons.push(
                        <Button
                            key={butt.text}
                            className={clsx(style.MenuButton, activeCategory === butt.text ? style.menuButtonActive : "",
                                activePanel === butt.activePanel ? "" : style.hideCategoryButtons)}
                            onClick={() => { checkIfCategoryIsSubmitted(butt.buttonType, butt.text) }}
                        >
                            <div className={clsx(style.menuButtonText, style.menuButtonCategoryText)}>{index + 1}. {butt.text}</div>
                            {alerts?.categoryMap.has(butt.text) ? <AlertNotification type={AlertType.Multiple} message="Ikke besvart eller utdaterte spørsmål i kategori" size={alerts.categoryMap.get(butt.text)}/> : ""}
                        </Button>
                    );
                });
            }
        });
        
        return buttons;
    };

    const setUpMobileMenu = () => {
        let listItems: JSX.Element[] = [];

        buttonSetup.forEach((butt) => {
            listItems.push(
                <ListItem
                    key={butt.text}
                    className={clsx(style.MenuButton)}
                    onClick={() => { checkIfCategoryIsSubmitted(butt.buttonType, undefined)}}
                >
                    <ListItemText primary={butt.text} />
                    {/* <div className={clsx(style.menuButtonText)}>{butt.text}</div> */}
                    {(butt.buttonType === MenuButton.MyAnswers) ? getTotalAlertsElement() : ""}
                </ListItem>
            );
        });

        return listItems;
    }

    const mobileNavRef = useRef<HTMLInputElement>(null);
    const categoryNavRef = useRef<HTMLInputElement | null>(null)
    const [collapseMobileCategories, setCollapseMobileCategories] = useState<boolean>(false);


    const handleScroll = () => {
        if (mobileNavRef.current?.scrollTop !== undefined && categoryNavRef.current?.clientHeight !== undefined) {
            if (mobileNavRef.current?.scrollTop > categoryNavRef.current?.clientHeight-56) {
                setCollapseMobileCategories(true)
            } else {
                setCollapseMobileCategories(false)
            }
        }
    }
    

    const setupPanel = (): JSX.Element => {
        switch (activePanel) {
            case Panel.Overview:
                return(
                    <Overview
                        activePanel={activePanel}
                        answers={answers}
                        categories={categories}
                        isMobile={props.isMobile}
                    />
                );
            case Panel.MyAnswers:
                return(
                    <YourAnswers
                        activePanel={activePanel}
                        setIsCategorySubmitted={setIsCategorySubmitted}
                        createUserForm={createUserForm}
                        updateAnswer={updateAnswer}
                        formDefinition={formDefinition}
                        answers={answers}
                        submitFeedback={submitFeedback}
                        changeActiveCategory={changeActiveCategory}
                        categories={categories}
                        activeCategory={activeCategory}
                        setAnswerEditMode={setAnswerEditMode}
                        answerEditMode={answerEditMode}
                        isMobile={props.isMobile}
                        alerts={alerts}
                        checkIfCategoryIsSubmitted={checkIfCategoryIsSubmitted}
                        collapseMobileCategories={collapseMobileCategories}
                        categoryNavRef={categoryNavRef}
                    />
                );
            case Panel.GroupLeader:
                return (
                    <div>Welcome to the "Group Leader" panel!</div>
                );
            case Panel.Other:
                return(
                    <div>Hello! This is the "Other" panel :D</div>
                );
        }
        return <div></div>;
    };

    
    
    return (
            <div className={props.isMobile ? mobileStyle.root : style.root} onScroll={() => handleScroll()} ref={mobileNavRef}>
                {
                    props.isMobile ? <NavBarMobile menuButtons={setUpMobileMenu()} activePanel={activePanel}/> : <div className={style.menu}>{setupDesktopMenu()}</div>
                } 
                <div className={props.isMobile ? mobileStyle.panel : style.panel}>{setupPanel()}</div>
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
        
          
    );
};

export default Content;
