import React, { Fragment, useEffect, useRef, useState } from 'react';
import { AnswerData, ContentProps, FormDefinition, FormDefinitionByCreatedAt, UserAnswer, UserFormWithAnswers, UserFormByCreatedAt, UserForm, CreateQuestionAnswerResult, AlertState , Alert, Question, Category, QuestionAnswer, SliderValues, FormDefinitionByCreatedAtPaginated, FormDefinitionPaginated } from '../types';
import * as helper from '../helperFunctions';
import * as customQueries from '../graphql/custom-queries';
import { Overview } from './cards/Overview';
import { YourAnswers } from './cards/YourAnswers';
import { CreateQuestionAnswerInput } from '../API';
import { Button, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { KnowitColors } from '../styles';
import { AlertDialog } from './AlertDialog';
import { AlertNotification, AlertType, staleAnswersLimit } from './AlertNotification';
import NavBarMobile from './NavBarMobile';
import { AnswerHistory } from './AnswerHistory';

const cardCornerRadius: number = 40;

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
        // overflow: 'hidden',
        height: '100%'
    },
});

export const contentStyleMobile = makeStyles({
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        // overflowY: 'scroll',
        overflowX: 'hidden',
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
    contentContainer: {
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
        boxShadow: "0px 4px 4px rgb(0 0 0 / 15%)",
        zIndex: 1
    },
    MenuButton: {
        borderRadius: `${cardCornerRadius}px 0 0 ${cardCornerRadius}px`,
        '&:hover': {
            background: KnowitColors.white
        },
        textTransform: "none"
    },
    menuButtonActive: {
        background: KnowitColors.white,
        marginRight: -2
    },
    menuButtonText: {
        fontSize: 15,
        textAlign: 'left',
        width: '100%',
        marginLeft: 10,
        fontWeight: 'bold',
        display: 'flex',
        color: KnowitColors.darkBrown
    },
    menuButtonCategoryText: {
        fontSize: 12,
        marginLeft: 20,
        display: 'flex'
    },
    hideCategoryButtons: {
        display: 'none'  
    },
    panel: {
        background: KnowitColors.white,
        height: '100%',
        width: '80%'
    },
});

const Content = ({...props}: ContentProps) => {
    
    const [formDefinition, setFormDefinition] = useState<FormDefinition | null>(null);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]); //Used only for getting data on load
    const [userAnswersLoaded, setUserAnswersLoaded] = useState(false)
    const [submitFeedback, setSubmitFeedback] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);
    const [questionAnswers, setQuestionAnswers] = useState<Map<string, QuestionAnswer[]>>(new Map());
    // const [answersBeforeSubmitted, setAnswersBeforeSubmitted] = useState<AnswerData[]>([]);
    const [answersBeforeSubmitted, setAnswersBeforeSubmitted] = useState<Map<string, QuestionAnswer[]>>(new Map());
    // const [historyViewOpen, setHistoryViewOpen] = useState<boolean>(false);
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
        questionAnswers.forEach((quAnsArr, cat) => {
            quAnsArr.forEach(quAns => {
                if (quAns.motivation === -1 || quAns.knowledge === -1) {
                    alerts.set(quAns.id, { type: AlertType.Incomplete, message: "Ubesvart!" });
                    let numAlerts = catAlerts.get(quAns.category.text);
                    if (numAlerts)
                        catAlerts.set(quAns.category.text, numAlerts + 1);
                    else
                        catAlerts.set(quAns.category.text, 1);
                } else if (msNow - quAns.updatedAt > staleAnswersLimit) {
                    alerts.set(quAns.id, {
                        type: AlertType.Outdated,
                        message: `Bør oppdateres! Sist besvart: ${new Date(quAns.updatedAt)  //.toLocaleDateString('no-NO')
                            }`
                    });
                    let numAlerts = catAlerts.get(quAns.category.text);
                    if (numAlerts)
                        catAlerts.set(quAns.category.text, numAlerts + 1);
                    else
                        catAlerts.set(quAns.category.text, 1);
                }
           });
        });
        setAlerts({qidMap: alerts, categoryMap: catAlerts});
    }
    
    const fetchLastFormDefinition = async () => {
        let nextToken: string | null = null;
        let questions: Question[] = [];
        let formDefPaginated: FormDefinitionPaginated = undefined;
        do {
            let currentForm = await helper.callGraphQL<FormDefinitionByCreatedAtPaginated>(customQueries.formByCreatedAtPaginated, {...customQueries.formByCreatedAtInputConsts, nextToken: nextToken});
            if (currentForm.data && currentForm.data.formByCreatedAt.items[0]) {
                if (typeof formDefPaginated === 'undefined') {
                    formDefPaginated = currentForm.data.formByCreatedAt.items[0];
                    questions = currentForm.data.formByCreatedAt.items[0].questions.items;
                } else {
                    questions = questions.concat(currentForm.data.formByCreatedAt.items[0].questions.items);
                }
                nextToken = currentForm.data.formByCreatedAt.items[0].questions.nextToken;
            }
        } while (nextToken);
        if (formDefPaginated) {
            let formDef: FormDefinition = {
                    id: formDefPaginated.id,
                    createdAt: formDefPaginated.createdAt,
                    questions: {
                        items: questions
                    }
                };
                console.log("FormDef:", formDef);
                setFormDefinition(formDef);
                let quAns = createQuestionAnswers(formDef);
                let userAnswers = await getUserAnswers();
                setFirstAnswers(quAns, userAnswers);
        } else {
            console.log("Error loading form definition!");
        }
    };
    
    const getUserAnswers = async() => {
        if (!props.user) return console.error("User not found when getting useranswers");
        let lastUserForm: UserForm | undefined = (await helper.callGraphQL<UserFormByCreatedAt>
            (customQueries.customUserFormByCreatedAt, { ...customQueries.userFormByCreatedAtInputConsts, owner: props.user.username })).data?.userFormByCreatedAt.items[0];
         
        let lastUserFormAnswers;
        
        if (lastUserForm) {
            lastUserFormAnswers = lastUserForm.questionAnswers.items;
            setUserAnswers(lastUserFormAnswers);
            setUserAnswersLoaded(true);
        } else {
            setActivePanel(Panel.MyAnswers);
            setAnswerEditMode(true);
            setUserAnswersLoaded(true);
            props.setFirstTimeLogin(true);
            if (!props.isMobile) {
                props.setScaleDescOpen(true);
            }
        }
        
        // console.log("Last userform: ", lastUserForm);
        return lastUserForm?.questionAnswers.items;
    };
    
    const createQuestionAnswers = (formDef: FormDefinition) => {
        // console.log("Creating questionAnswers with ", formDef);
        if (!formDef) return new Map();
        let categories = formDef.questions.items
            .map(item => item.category)
            .filter((category, index, array) => array.findIndex(obj => obj.text === category.text) === index)
            .sort((a, b) => {
                if (a.index && b.index == null) return -1;
                if (a.index == null && b.index) return 1;
                if (a.index && b.index) return a.index - b.index;
                if (a.index == null && b.index == null) return a.text.localeCompare(b.text);
                return 0;
            });
        setCategories(categories.map(cat => cat.text));
        let quAnsMap = new Map<string, QuestionAnswer[]>();
        categories.forEach(cat => {
            let quAns: QuestionAnswer[] = formDef.questions.items
                .filter(question => question.category.id === cat.id)
                .sort((a, b) => {
                    if (a.index && b.index == null) return -1;
                    if (a.index == null && b.index) return 1;
                    if (a.index && b.index) return a.index - b.index;
                    if (a.index == null && b.index == null) return a.topic.localeCompare(b.topic);
                    return 0;
                })
                .map(qu => {
                    return {
                        category: qu.category,
                        createdAt: qu.createdAt,
                        id: qu.id,
                        index: qu.index,
                        qid: qu.qid,
                        text: qu.text,
                        topic: qu.topic,
                        knowledge: -1,
                        motivation: -1,
                        updatedAt: 0
                    }
                });
            quAnsMap.set(cat.text, quAns);
        });
        // console.log(`Sorted questionAnswerMap: `, quAnsMap);
        return quAnsMap;
    };
    
    const setFirstAnswers = (quAns: Map<string, QuestionAnswer[]>, newUserAnswers: UserAnswer[] | void) => {
        let newMap = new Map<string, QuestionAnswer[]>();
        quAns.forEach((quAns, category) => {
            newMap.set(category, quAns.map(questionAnswer => {
                if(newUserAnswers){
                    let userAnswer = newUserAnswers.filter(userAnswer => userAnswer.question.id === questionAnswer.id);
                    if(userAnswer.length === 0) return questionAnswer;
                    return {
                        ...questionAnswer,
                        knowledge: userAnswer[0] ? userAnswer[0].knowledge : questionAnswer.knowledge,
                        motivation: userAnswer[0] ? userAnswer[0].motivation : questionAnswer.motivation,
                        updatedAt: Date.parse(userAnswer[0].updatedAt) || 0
                    }
                }
                return questionAnswer;
            }))
        });
        setQuestionAnswers(newMap);
    };
    
    const updateAnswer = (category: string, sliderMap: Map<string, SliderValues>): void => {
        let newAnswers: QuestionAnswer[] = questionAnswers.get(category)
            ?.map(quAns => {
                let sliderValues = sliderMap.get(quAns.id);
                return {
                    ...quAns,
                    knowledge: sliderValues ? sliderValues.knowledge : -2, //If is -2, something is wrong
                    motivation: sliderValues ? sliderValues.motivation : -2,
                    updatedAt: Date.now()
                }
            }) || [];
        setQuestionAnswers(new Map(questionAnswers.set(category, newAnswers)));
    };
    
    
    const createUserForm = async () => {
        setIsCategorySubmitted(true)
        // setAnswersBeforeSubmitted(JSON.parse(JSON.stringify(answers)));
        setAnswersBeforeSubmitted(new Map(questionAnswers));
        setAnswerEditMode(false);
        if(!formDefinition) {
            console.error("Missing formDefinition!");
            return;
        }
        let quAnsInput: CreateQuestionAnswerInput[] = [];
        questionAnswers.get(activeCategory)?.forEach(quAns => {
            if (quAns.knowledge < 0 && quAns.motivation < 0) return;
            quAnsInput.push({
                userFormID: "",
                questionID: quAns.id,
                knowledge: quAns.knowledge,
                motivation: quAns.motivation,
                environmentID: helper.getEnvTableID(),
                formDefinitionID: formDefinition.id.toString()
            });
        });
        if(quAnsInput.length === 0){
            console.error("Error finding active category whe creating userform");
            return;
        }
        // questionAnswers.forEach((quAnsArr, cat) => {
        //     quAnsArr.forEach(quAns => {
        //         if (quAns.knowledge < 0 && quAns.motivation < 0) return;
        //         quAnsInput.push({
        //             userFormID: "",
        //             questionID: quAns.id,
        //             knowledge: quAns.knowledge,
        //             motivation: quAns.motivation,
        //             environmentID: helper.getEnvTableID(),
        //             formDefinitionID: formDefinition.id.toString()
        //         });
        //     })
        // });
        // console.log("question answer input: ", quAnsInput);
        let result = (await helper.callBatchGraphQL<CreateQuestionAnswerResult>(customQueries.batchCreateQuestionAnswer2, { input: quAnsInput}, "QuestionAnswer")).map(result => result.data?.batchCreateQuestionAnswer);
        // console.log("Result: ", result);
        if(!result || result.length === 0) {
            return;
        }
    }
    
    const changeActiveCategory = (newActiveCategory: string) => {
        setActiveCategory(newActiveCategory);
        setAnswerEditMode(false);
    };
    
    const fetchUserFormsAndOpenView = async () => {
        // debugger
        let allUserForms = await helper.listUserForms();
        setAnswerLog(allUserForms);
        props.setAnswerHistoryOpen(true);
    };

    const resetAnswers = () => {
        // setAnswers(JSON.parse(JSON.stringify(answersBeforeSubmitted))) // json.parse to deep copy
        setQuestionAnswers(new Map(answersBeforeSubmitted));
    }

    const submitAndProceed = () => {
        createUserForm();
        let currentIndex = categories.findIndex( (cat) => cat === activeCategory);
        if (categories.length >= currentIndex) {
            changeActiveCategory(categories[currentIndex + 1]);
            setAnswerEditMode(true);   
        }
    }


    useEffect(() => {
        setActiveCategory(categories[0]);
        // setAnswerEditMode(false);
    }, [categories]);
    
    useEffect(() => {
        updateCategoryAlerts();
    }, [questionAnswers]);
    
    useEffect(() => {
        fetchLastFormDefinition();
    }, []);

    useEffect(() => {
        // console.log("userAnswers")
        // setAnswersBeforeSubmitted(JSON.parse(JSON.stringify(answers)));
        setAnswersBeforeSubmitted(new Map(questionAnswers));
    }, [userAnswers]);

    useEffect(() => {
        if (props.answerHistoryOpen) {
            fetchUserFormsAndOpenView() 
        } else {
            props.setAnswerHistoryOpen(false);
        }
    }, [props.answerHistoryOpen]);

    useEffect(() => {
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
            setAlertDialogOpen(true);
        }
    };
    
    const leaveFormButtonClicked = () => {
        setAnswerEditMode(false);
        setAlertDialogOpen(false);
        setIsCategorySubmitted(true);
        resetAnswers();
        menuButtonClicked(lastButtonClicked.buttonType, lastButtonClicked.category);
    };
    
    const menuButtonClicked = (buttonType: MenuButton, category?: string) => {
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
        let totalAlerts = alerts?.qidMap.size ?? 0;
        if (totalAlerts > 0)
            return <AlertNotification
                type={AlertType.Multiple}
                message="Totalt ubesvarte eller utdaterte spørsmål"
                size={totalAlerts}
                />;
        else
            return <Fragment/>;
    }

    const getMainMenuAlertElement = (): JSX.Element => {
        let totalAlerts = alerts?.qidMap.size ?? 0;
        if (totalAlerts > 0)
            return <AlertNotification
                type={AlertType.Multiple}
                message="Besvarelsen er utdatert eller ikke komplett!"
                size={0}
                />;
        else
            return <Fragment/>;
    }


    <AlertNotification type={AlertType.Multiple} message="Besvarelsen er utdatert eller ikke komplett!" size={0}/>

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
        { text: "OVERSIKT", buttonType: MenuButton.Overview },
        { text: "MINE SVAR", buttonType: MenuButton.MyAnswers, subButtons: categories.map((cat) => {
                return { text: cat, buttonType: MenuButton.Category, activePanel: Panel.MyAnswers }
            })
        },
        // { text: "Test", buttonType: MenuButton.Other },
        // { text: "Parent", buttonType: MenuButton.GroupLeader, subButtons: [
        //     { text: "Child 1", buttonType: MenuButton.LeaderCategory, activePanel: Panel.GroupLeader },
        //     { text: "Child 2", buttonType: MenuButton.LeaderCategory, activePanel: Panel.GroupLeader },
        //     { text: "Child 3", buttonType: MenuButton.LeaderCategory, activePanel: Panel.GroupLeader },
        // ]},
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
                        <div className={clsx(style.menuButtonText)}>
                            {butt.text}
                            {(butt.buttonType === MenuButton.MyAnswers) ? getMainMenuAlertElement() : ""}
                        </div>
                        {/* {(butt.buttonType === MenuButton.MyAnswers) ? getTotalAlertsElement() : ""} */}
                </Button>
            );
            if(butt.subButtons){
                butt.subButtons.forEach((butt, index) => {
                    buttons.push(
                        // TODO: IKKE CAPS
                        <Button
                            key={butt.text}
                            className={clsx(style.MenuButton, activeCategory === butt.text ? style.menuButtonActive : "",
                                activePanel === butt.activePanel ? "" : style.hideCategoryButtons)}
                            onClick={() => { checkIfCategoryIsSubmitted(butt.buttonType, butt.text) }}
                        >
                            <div className={clsx(style.menuButtonText, style.menuButtonCategoryText)}>
                                {index + 1}. {butt.text}
                                {alerts?.categoryMap.has(butt.text) ? <AlertNotification type={AlertType.Multiple} message="Ikke besvart eller utdaterte spørsmål i kategori" size={alerts.categoryMap.get(butt.text)}/> : ""}
                            </div>
                            {/* {alerts?.categoryMap.has(butt.text) ? <AlertNotification type={AlertType.Multiple} message="Ikke besvart eller utdaterte spørsmål i kategori" size={alerts.categoryMap.get(butt.text)}/> : ""} */}
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
                    onClick={() => { checkIfCategoryIsSubmitted(butt.buttonType, undefined)}}
                >
                    {butt.text}
                    {(butt.buttonType === MenuButton.MyAnswers) ? getMainMenuAlertElement() : ""}
                </ListItem>
            );
        });

        return listItems;
    }
    

    const enableAnswerEditMode = () => {
        setAnswersBeforeSubmitted(new Map(questionAnswers));
        setAnswerEditMode(true);
    }

    const setupPanel = (): JSX.Element => {
        switch (activePanel) {
            case Panel.Overview:
                return(
                    <Overview
                        activePanel={activePanel}
                        questionAnswers={questionAnswers}
                        categories={categories}
                        isMobile={props.isMobile}
                        userAnswersLoaded={userAnswersLoaded}
                    />
                );
            case Panel.MyAnswers:
                return(
                    <YourAnswers
                        activePanel={activePanel}
                        setIsCategorySubmitted={setIsCategorySubmitted}
                        createUserForm={createUserForm}
                        submitAndProceed={submitAndProceed}
                        updateAnswer={updateAnswer}
                        formDefinition={formDefinition}
                        questionAnswers={questionAnswers}
                        changeActiveCategory={changeActiveCategory}
                        categories={categories}
                        activeCategory={activeCategory}
                        enableAnswerEditMode={enableAnswerEditMode}
                        answerEditMode={answerEditMode}
                        isMobile={props.isMobile}
                        alerts={alerts}
                        checkIfCategoryIsSubmitted={checkIfCategoryIsSubmitted}
                        collapseMobileCategories={props.collapseMobileCategories}
                        categoryNavRef={props.categoryNavRef}
                        scrollToTop={props.scrollToTop}
                        setCollapseMobileCategories={props.setCollapseMobileCategories}
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


    //onScroll={() => handleScroll()}
    return (
            <div className={props.isMobile ? mobileStyle.contentContainer : style.contentContainer}  ref={props.mobileNavRef}>
                {
                    props.isMobile ? 
                        <NavBarMobile 
                            menuButtons={setUpMobileMenu()} 
                            activePanel={activePanel}
                            userName={props.userName}
                            userPicture={props.userPicture}
                            signout={props.signout}

                        /> 
                    : <div className={style.menu}>{setupDesktopMenu()}</div>
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
                <AnswerHistory history={answerLog} historyViewOpen={props.answerHistoryOpen} setHistoryViewOpen={props.setAnswerHistoryOpen} isMobile={props.isMobile}/>
            </div>
    );
};

export default Content;
