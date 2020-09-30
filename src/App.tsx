import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form'
import Amplify, {Auth, Hub, API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/custom-queries';
import {AnsweredQuestion, Answers, UserFormCreated} from './types';
import RadarPlot from './components/RadarPlot';
import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import * as helper from './helperFunctions'

Amplify.configure(awsconfig);

const testData: AnsweredQuestion[] = [
    {
        question: {
            text: "Text 1",
            topic: "Topic 1",
            group: "Group 1",
            category: "Category 1"
        },
        answer: 2
    }, {
        question: {
            text: "Text 2",
            topic: "Topic 2",
            group: "Group 1",
            category: "Category 1"
        },
        answer: 3
    }, {
        question: {
            text: "Text 3",
            topic: "Topic 3",
            group: "Group 1",
            category: "Category 2"
        },
        answer: 3
    }, {
        question: {
            text: "Text 4",
            topic: "Topic 4",
            group: "Group 1",
            category: "Category 2"
        },
        answer: 5
    }, {
        question: {
            text: "Text 5",
            topic: "Topic 5",
            group: "Group 1",
            category: "Category 4"
        },
        answer: 2
    },
]

let formDef = require('./form2.json')

const App = () => {
    const [user, setUser] = useState<any | null>(null);
    const [formDefinition, setFormDefinition] = useState<any | null>(null);

    const updateAnswer = (key: string, rating: number): void => {
        console.log(key);
        console.log(rating);
        let newAnswers = {...answers};
        console.log(answers);
        console.log(newAnswers);
        newAnswers[key].rating = rating;
        setAnswers(newAnswers);
    }

    const createAnswers = (): Answers => {
        if(!formDefinition) return {};
        let formDef = formDefinition.data.getFormDefinition;
        let as = {} as Answers;
        if(formDef.questions.items){
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

    const [answers, setAnswers] = useState(createAnswers());

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    getUser().then(userData => setUser(userData));
                    break;
                case 'signOut':
                    setUser(null);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
            }
        });
        getUser().then(userData => setUser(userData));
        getFormDefinition().then(f => {
            setFormDefinition(f)
        });
    }, []);

    async function getFormDefinition() {
        return API.graphql(graphqlOperation(queries.getFormDefinitionWithQuestions, { id: "fd1" }));
    }

    function getUser() {
        return Auth.currentAuthenticatedUser()
            .then(userData => userData)
            .catch(() => console.log('Not signed in'));
    }

    async function sendFormDefinition() {
        /* 
        Dirty function to upload form definition in the initial stages of the project.
        Should not be kept in the future.
        */
        let i;
        let question;
        let qid;
        let fdid = "fd1";
        let res = await API.graphql(graphqlOperation(mutations.createFormDefinition, { input: { "id": fdid } }));
        for (i = 0; i < formDef.length; i++) {
            question = formDef[i];
            qid = "q" + i;
            res = await API.graphql(graphqlOperation(mutations.createQuestion, { input: { ...question, "id": qid } }));
            res = await API.graphql(graphqlOperation(mutations.createQuestionFormDefinitionConnection, { input: { "formDefinitionID": fdid, "questionID": qid, "id": fdid + qid } }));
        }
    }

    return (
        <div>
            <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
            <button onClick={() => sendFormDefinition()}>Send form definition to server</button>
            <AmplifySignOut />
            My App
            <div style={{ height: '500px', width: '500px' }}><RadarPlot data={testData} /></div>
            {(!formDefinition) ? "" : <Form updateAnswer={updateAnswer} formDefinition={formDefinition} createUserForm={createUserForm} />}
        </div>
    );
}

export default withAuthenticator(App);