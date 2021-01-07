import { Button, makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react'
import { KnowitColors } from '../styles';
import { AnswerProps } from '../types';
import { Category } from './Category';
import Question from './Question';

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
    submitButton: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        textTransform: "none",
        color: KnowitColors.white,
        backgroundColor: KnowitColors.darkGreen,
        '&:hover': {
            background: KnowitColors.darkGreen
        }
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
    submitButton: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        textTransform: "none",
        color: KnowitColors.white,
        backgroundColor: KnowitColors.darkGreen,
        '&:hover': {
            background: KnowitColors.darkGreen
        }
    },
});

export const Form = ({...props}: AnswerProps) => {

    type Question = {
        id: string,
        text: string,
        topic: string,
        category: {
            text: string
        }
    }

    const style = props.isMobile ? FormStyleMobile() : FormStyleDesktop();

    const getQuestionsForCategory = (items: Question[]): JSX.Element[] => {
        let questions: JSX.Element[] = [];
        for(const item of items){
            const answer = props.answers.find(a => a.questionId === item.id);
            questions.push(
                <Question 
                    key={item.id} 
                    questionId={item.id}
                    topic={item.topic}
                    text={item.text}
                    updateAnswer={props.updateAnswer}
                    knowledgeDefaultValue={answer ? (answer.knowledge ? answer.knowledge : 0) : -1}
                    motivationDefaultValue={answer ? (answer.motivation ? answer.motivation : 0) : -1}
                    setIsCategorySubmitted={props.setIsCategorySubmitted}
                    isMobile={props.isMobile}
                />
            );
        };
        return questions;
    };

    const handleClick = () => {
        props.createUserForm();
    }

    //TODO: Return only used category, not everyone
    const createQuestionCategory = (): JSX.Element => {
        if(!props.formDefinition) return <Fragment />;
        let questions = props.formDefinition.questions.items.filter(item => item.category.text === props.activeCategory)
            .sort((a, b) => (a.category.text < b.category.text) ? -1 : 1);
        return (
            <Fragment>
                {props.categories.length > 0
                    ? <Button 
                        onClick={handleClick} 
                        className={style.submitButton} 
                        >Send inn svar</Button>
                    : ""
                }
                <Category name={props.activeCategory} isMobile={props.isMobile}>
                    {getQuestionsForCategory(questions)}
                </Category>
                {props.categories.length > 0
                    ? <Button 
                        onClick={handleClick} 
                        className={style.submitButton} 
                        >Send inn svar</Button>
                    : ""
                }
            </Fragment>
        );
    };

    return (
        <div className={style.root}>
            {createQuestionCategory()}
        </div>
    )
};
