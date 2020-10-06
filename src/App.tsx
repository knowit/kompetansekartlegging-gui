import React, { useEffect, useState } from 'react';
import './App.css';
import Amplify, {Auth, Hub, API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import * as mutations from './graphql/mutations';
import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import Content from './components/Content';
import NavBar from './components/NavBar';
import { Footer } from './components/Footer';
import { BrowserRouter } from 'react-router-dom';

Amplify.configure(awsconfig);

let formDef = require('./form2.json')

const App = () => {
    const [user, setUser] = useState<any | null>(null);
    

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
    }, []);

    

    const getUser = () => {
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
        let fdid = "fd5";
        let res = await API.graphql(graphqlOperation(mutations.createFormDefinition, { input: { "id": fdid } }));
        for (i = 0; i < formDef.length; i++) {
            question = formDef[i];
            qid = "qq" + i + "k";
            res = await API.graphql(graphqlOperation(mutations.createQuestion, { input: { ...question, "id": qid, "type": "knowledge" } }));
            res = await API.graphql(graphqlOperation(mutations.createQuestionFormDefinitionConnection, { input: { "formDefinitionID": fdid, "questionID": qid, "id": fdid + qid } }));
            console.log(qid);
            qid = "qq" + i + "m";
            res = await API.graphql(graphqlOperation(mutations.createQuestion, { input: { ...question, "id": qid, "type": "motivation" } }));
            res = await API.graphql(graphqlOperation(mutations.createQuestionFormDefinitionConnection, { input: { "formDefinitionID": fdid, "questionID": qid, "id": fdid + qid } }));
            console.log(qid);
        }
    }

    return (
        <div>
            <BrowserRouter>
                <NavBar/>
                <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
                <button onClick={() => sendFormDefinition()}>Send form definition to server</button>
                <AmplifySignOut />
                My App
                <Content />
                {/*(!formDefinition) ? "" : <Form updateAnswer={updateAnswer} formDefinition={formDefinition} createUserForm={createUserForm} />*/}
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default withAuthenticator(App);