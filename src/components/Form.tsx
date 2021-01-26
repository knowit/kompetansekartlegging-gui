import { Button, makeStyles } from '@material-ui/core';
import React, { Fragment, useRef } from 'react'
import { KnowitColors } from '../styles';
import { FormProps, SliderValues } from '../types';
import { Category } from './Category';
import Question from './Question';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import ProgressBar from './ProgressBar';

const FormStyleDesktop = makeStyles({
    root: {
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        backgroundColor: KnowitColors.white,
        width: '100%',
        boxSizing: "border-box",
        borderRadius: 10
    },
    blockButtons: {
        padding: 20,
        display: 'flex',
        justifyContent: 'space-around'
    },
    submitButton: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 18,
        fontWeight: 'bold',
        textTransform: "none",
        color: KnowitColors.black,
        backgroundColor: KnowitColors.white,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: KnowitColors.lightGreen,
        '&:hover': {
            background: KnowitColors.ecaluptus
        }
    },
    submitAndProceedButton: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 18,
        fontWeight: 'bold',
        textTransform: "none",
        color: KnowitColors.black,
        backgroundColor: KnowitColors.lightGreen,
        '&:hover': {
            background: KnowitColors.ecaluptus
        }
    },
    buttonIcon: {
        paddingLeft: 10
    },
});

const FormStyleMobile = makeStyles({
    root: {
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        backgroundColor: KnowitColors.white,
        width: '100%',
        boxSizing: "border-box",
        borderRadius: 10
    },
    blockButtons: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    submitButton: {
        margin: 10,
        width: '80%',
        borderRadius: 18,
        fontWeight: 'bold',
        textTransform: "none",
        color: KnowitColors.black,
        backgroundColor: KnowitColors.white,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: KnowitColors.lightGreen,
        '&:hover': {
            background: KnowitColors.ecaluptus
        }
    },
    submitAndProceedButton: {
        margin: 10,
        width: '80%',
        borderRadius: 18,
        fontWeight: 'bold',
        textTransform: "none",
        color: KnowitColors.black,
        backgroundColor: KnowitColors.lightGreen,
        '&:hover': {
            background: KnowitColors.ecaluptus
        }
    },
    buttonIcon: {
        paddingLeft: 10
    },
});

type Question = {
    id: string,
    text: string,
    topic: string,
    category: {
        text: string
    }
};

export const Form = ({...props}: FormProps) => {
    
    const sliderValues = useRef<Map<string, SliderValues>>(new Map()); //String is questionid, values are knowledge and motivation

    const style = props.isMobile ? FormStyleMobile() : FormStyleDesktop();
    
    const setSliderValues = (questionId: string, values: SliderValues) => {
        sliderValues.current.set(questionId, values);
    }

    const getQuestionsForCategory = (items: Question[] | undefined): JSX.Element[] => {
        //console.log("Props to make questions from: ", props.questionAnswers);
        let questionAnswers = props.questionAnswers?.get(props.activeCategory)?.map(question => {
            sliderValues.current.set(question.id, {knowledge: question.knowledge, motivation: question.motivation});
            return <Question
                    key={question.id}
                    questionId={question.id}
                    topic={question.topic}
                    text={question.text}
                    updateAnswer={props.updateAnswer}
                    knowledgeDefaultValue={question.knowledge}
                    motivationDefaultValue={question.motivation}
                    setIsCategorySubmitted={props.setIsCategorySubmitted}
                    isMobile={props.isMobile}
                    alerts={props.alerts}
                    sliderValues={sliderValues.current}
                    setSliderValues={setSliderValues}
                />
        }) || [];
        //console.log("Form question answers:", questionAnswers);
        return questionAnswers;
        // return props.questions?.map(question => {
        //     const answer = props.answers.find(a => a.questionId === question.id);
        //     return <Question
        //         key={question.id}
        //         questionId={question.id}
        //         topic={question.topic}
        //         text={question.text}
        //         updateAnswer={props.updateAnswer}
        //         knowledgeDefaultValue={answer ? (answer.knowledge ? answer.knowledge : 0) : -1}
        //         motivationDefaultValue={answer ? (answer.motivation ? answer.motivation : 0) : -1}
        //         setIsCategorySubmitted={props.setIsCategorySubmitted}
        //         isMobile={props.isMobile}
        //         alerts={props.alerts}
        //     />
        // }) || [];
        // let questions: JSX.Element[] = [];
        // for(const item of items){
        //     const answer = props.answers.find(a => a.questionId === item.id);
        //     questions.push(
        //         <Question 
        //             key={item.id} 
        //             questionId={item.id}
        //             topic={item.topic}
        //             text={item.text}
        //             updateAnswer={props.updateAnswer}
        //             knowledgeDefaultValue={answer ? (answer.knowledge ? answer.knowledge : 0) : -1}
        //             motivationDefaultValue={answer ? (answer.motivation ? answer.motivation : 0) : -1}
        //             setIsCategorySubmitted={props.setIsCategorySubmitted}
        //             isMobile={props.isMobile}
        //             alerts={props.alerts}
        //         />
        //     );
        // };
        // return questions;
    };
    
    const handleClickSubmit = async () => {
        // TODO pending other PR: check isCategorySubmitted so new user form isn't generated when nothing has changed
        await props.updateAnswer(props.activeCategory, sliderValues.current);
        props.createUserForm();
    }

    const handleClickProceed = async () => {
        await props.updateAnswer(props.activeCategory, sliderValues.current);
        props.submitAndProceed();
        props.scrollToTop();
    }

    //TODO: Return only used category, not everyone
    const createQuestionCategory = (): JSX.Element => {
        if (!props.formDefinition) return <Fragment />;
        // let questions = props.formDefinition.questions.items.filter(item => item.category.text === props.activeCategory)
        //     .sort((a, b) => (a.category.text < b.category.text) ? -1 : 1);
        return (
            <Fragment>
                <ProgressBar alerts={props.alerts} totalQuestions={props.questionAnswers.size}/>
                <Category name={props.activeCategory} isMobile={props.isMobile}>
                    {getQuestionsForCategory(undefined)}
                </Category>
                <div className={style.blockButtons}>
                    {props.categories.length > 0
                        ? <Button 
                            onClick={handleClickSubmit} 
                            className={style.submitButton} 
                            >Send inn svar og avslutt</Button>
                        : ""
                    }
                    {(props.categories.findIndex((cat) => cat === props.activeCategory) !== (props.categories.length - 1))
                        ? <Button 
                            onClick={handleClickProceed} 
                            className={style.submitAndProceedButton} 
                            >Lagre og gå videre<ArrowForwardRoundedIcon className={style.buttonIcon}/></Button>
                        : ""
                    }
                </div>
            </Fragment>
        );
    };

    return (
        <div className={style.root}>
            {createQuestionCategory()}
        </div>
    )
};
