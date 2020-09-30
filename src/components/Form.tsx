import React, {useEffect, useState} from 'react'
import Question from './Question';
import {Questions, Answers, FormDefinitionWithQuestions, UserFormCreated} from '../types'
import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../graphql/mutations'
import * as helper from '../helperFunctions'

type Props = {
    formDefinition: FormDefinitionWithQuestions
}

const Form = ({...props}: Props) => {

    const updateAnswer = (key: string, rating: number): void => {
        let newAnswers = {...answers};
        newAnswers[key].rating = rating;
        setAnswers(newAnswers);
    }

    const createQuestions = (): void => {
        if(!props.formDefinition) return;

        let formDef = props.formDefinition.data.getFormDefinition;

        let qs: JSX.Element[] = [];
        if(formDef.questions){
            if(formDef.questions.items)

            for (let index = 0; index < formDef.questions.items.length; index++) {
                const element = formDef.questions.items[index];
                if (!element) continue;
                qs.push(
                    <Question 
                        key={element.question.id} 
                        listID={element.question.id}
                        topic={element.question.topic}
                        text={element.question.text}
                        updateAnswer={updateAnswer}
                    />
                );

            }
        }
        setQuestions(qs);
    };

    useEffect(() => {
        createQuestions();
    }, [props.formDefinition])

    const createAnswers = (): Answers => {

        if(!props.formDefinition) return {};

        let formDef = props.formDefinition.data.getFormDefinition;

        let as = {} as Answers;
        if(formDef.questions){
            if(formDef.questions.items)

            for (let index = 0; index < formDef.questions.items.length; index++) {
                const element = formDef.questions.items[index];
                if (!element) continue;

                as[element.question.id] = {
                    topic: element.question.topic,
                    group: "knowledge",
                    category: element.question.category,
                    rating: null
                }
            }
        }
        return as;
    };
    
    //TODO: Need more refactoring
    const createUserForm = async () => {
        let userForm: UserFormCreated | undefined = (await helper.callGraphQL<UserFormCreated>(mutations.createUserForm, {input: {}})).data;
        for (const [key, value] of Object.entries(answers)) {
            if(!value.rating) continue;
            API.graphql(graphqlOperation(
                mutations.createQuestionAnswer, {input: {
                    userFormID: userForm?.data.createUserForm.id, 
                    answer: value.rating, 
                    questionAnswerQuestionId: key
                }
            }))
        }
    }

    
    const [questions, setQuestions] = useState<JSX.Element[] | null>(null);
    const [answers, setAnswers] = useState(createAnswers());

    return (
        <div className="form">
            {questions}
            <button onClick={createUserForm}>Print all</button>
        </div>
    )
}

export default Form;
