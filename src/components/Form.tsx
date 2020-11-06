import { Button, makeStyles } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { KnowitColors } from '../styles';
import { AnswerProps } from '../types';
import { Category } from './Category';
import Question from './Question';

const FormStyle = makeStyles({
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
        width: '20%',
        fontWeight: 'bold',
        backgroundColor: KnowitColors.ecaluptus,
        '&:hover': {
            background: KnowitColors.lightGreen
        }
    },
});

export const Form = ({...props}: AnswerProps) => {

    type Question = {
        question: {
            id: string,
            text: string,
            topic: string,
            category: string
        }
    }

    const style = FormStyle();

    const getQuestionsForCategory = (items: Question[]): JSX.Element[] => {
        let questions: JSX.Element[] = [];
        for(const item of items){
            const answer = props.answers.find(a => a.questionId === item.question.id);
            questions.push(
                <Question 
                    key={item.question.id} 
                    questionId={item.question.id}
                    topic={item.question.topic}
                    text={item.question.text}
                    updateAnswer={props.updateAnswer}
                    knowledgeDefaultValue={answer ? (answer.knowledge ? answer.knowledge : 0) : -1}
                    motivationDefaultValue={answer ? (answer.motivation ? answer.motivation : 0) : -1}
                    setIsCategorySubmitted={props.setIsCategorySubmitted}
                />
            );
        };
        return questions;
    };

    useEffect(() => {
        debugger;
        window.onbeforeunload = confirmExit;
        function confirmExit()
        {
            debugger;
          return "show warning";
        }
    }, [])

    const handleClick = () => {
        props.createUserForm(); 
        props.setIsCategorySubmitted(true);        
    }

    //TODO: Return only used category, not everyone
    const createQuestionCategory = (): JSX.Element => {
        if(!props.formDefinition) return <Fragment />;
        let items = props.formDefinition.getFormDefinition.questions.items;
        if(!items) return <Fragment />;
        let questions = items.filter(item => item.question.category === props.activeCategory)
            .sort((a, b) => (a.question.category < b.question.category) ? -1 : 1);
        return (
            <Fragment>
                {props.categories.length > 0
                    ? <Button 
                        onClick={handleClick} 
                        className={style.submitButton} 
                        >Send Inn Svar</Button>
                    : ""
                }
                <Category name={props.activeCategory} >
                    {getQuestionsForCategory(questions)}
                </Category>
                {props.categories.length > 0
                    ? <Button 
                        onClick={handleClick} 
                        className={style.submitButton} 
                        >Send Inn Svar</Button>
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
