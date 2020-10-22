import React, {useEffect, useState} from 'react'
import { QuestionBlock } from '../styles';
import { AnswerProps, QuestionData } from '../types';
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

    const createQuestions = (): JSX.Element[] => {
        if(!props.formDefinition) return [];
        let items = props.formDefinition.getFormDefinition.questions.items;
        if(!items) return [];

        items = items.sort((a,b) => (a.question.category < b.question.category) ? -1 : 1);

        let categories: JSX.Element[] = [];
        let catNames: string[] = Array.from(new Set(
            items.map(i => i.question.category)      
        ));
        for(let i = 0; i < catNames.length; i++){
            const questions = items.filter(item => item.question.category === catNames[i]);
            categories.push(
                <div className={questionStyle.categoryGroup}>
                    <Category 
                        name={catNames[i]} 
                        key={i} 
                        activeCategory={props.activeCategory} >
                            {getQuestionsForCategory(questions)}
                    </Category>
                </div>
            );
        };
        return categories;
    };

    useEffect(() => {
        if(categories.length === 0) setCategories(createQuestions());
    }, [props.answers])

    return (
        <div className="form">
            <button onClick={props.createUserForm} >Submit Answers</button>
            {categories}
            <button onClick={props.createUserForm} >Submit Answers</button>
            <p>{props.submitFeedback}</p>
        </div>
    )
}

export default Form;
