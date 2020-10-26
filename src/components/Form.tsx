import React, { Fragment, useState } from 'react'
import { QuestionBlock } from '../styles';
import { AnswerProps } from '../types';
import { Category } from './Category';
import Question from './Question';

const Form = ({...props}: AnswerProps) => {

    type Question = {
        question: {
            id: string,
            text: string,
            topic: string,
            category: string
        }
    }

    const questionStyle = QuestionBlock();

    const [categories, setCategories] = useState<JSX.Element[]>([]);

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
                />
            );
        }
        return questions;
    }; 

    //TODO: Return only used category, not everyone
    const createQuestionCategory = (): JSX.Element => {
        if(!props.formDefinition) return <Fragment />;
        let items = props.formDefinition.getFormDefinition.questions.items;
        if(!items) return <Fragment />;
        let questions = items.filter(item => item.question.category === props.activeCategory)
            .sort((a, b) => (a.question.category < b.question.category) ? -1 : 1);
        return (
            <div className={questionStyle.categoryGroup}>
                <Category name={props.activeCategory} >
                    {getQuestionsForCategory(questions)}
                </Category>
            </div>
        );
        // let categories: JSX.Element[] = [];
        // for(let i = 0; i < props.categories.length; i++){
        //     const questions = items.filter(item => item.question.category === props.categories[i]);
        //     categories.push(
                
        //     );
        // };
        // return categories;
    };

    // useEffect(() => {
    //     if(categories.length === 0) setCategories(createQuestions());
    // }, [props.answers])

    return (
        <div className="form">
            {createQuestionCategory()}
            {/* <p>{props.submitFeedback}</p> */}
        </div>
    )
}

export default Form;
