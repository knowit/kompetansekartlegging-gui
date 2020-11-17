import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import Amplify, {Auth, Hub, API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import * as mutations from './graphql/mutations';
import * as helper from './helperFunctions'
import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import Content from './components/Content';
import NavBar from './components/NavBar';
import { Footer } from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import { callGraphQL } from './helperFunctions';
import { AppStyle } from './styles';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth/lib/types'
import Login from './components/Login';
import userEvent from '@testing-library/user-event';
import { UserFormWithAnswers } from './types';

awsconfig.oauth.redirectSignIn = `${window.location.origin}/`;
awsconfig.oauth.redirectSignOut = `${window.location.origin}/`;

Amplify.configure(awsconfig);

let formDef = require('./form2.json')

const App = () => {
    const style = AppStyle();

    const [user, setUser] = useState<any | null>(null);
    const [customState, setCustomState] = useState<any | null>(null)
    const [answerHistoryOpen, setAnswerHistoryOpen] = useState<boolean>(false);
    

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                    setUser(data);
                    break;
                case "signOut":
                    setUser(null);
                    break;
                case "customOAuthState":
                    setCustomState(data);
            }
        });

        Auth.currentAuthenticatedUser()
            .then(user => setUser(user))
            .catch(() => console.log("Not signed in"));
    }, []);

    useEffect(() => {
        // console.log(user);
    }, [user])

    async function sendFormDefinition() {
        /* 
        Dirty function to upload form definition in the initial stages of the project.
        Should not be kept in the future.
        */
        let i;
        let question;
        let qid:string;
        let res:any = await API.graphql(graphqlOperation(mutations.createFormDefinition, { input: {} }));
        console.log(res);
        let fdid = res.data.createFormDefinition.id;
        for (i = 0; i < formDef.length; i++) {
            question = formDef[i];
            qid = Date.now() + "_" + i;
            await API.graphql(graphqlOperation(mutations.createQuestion, { input: { ...question, "id": qid} }));
            await API.graphql(graphqlOperation(mutations.createQuestionFormDefinitionConnection, { input: { "formDefinitionID": fdid, "questionID": qid, "id": fdid + qid } }));
            // console.log(qid);
        }
    }

    const deleteUserData = async () => {
        let allUserForms = await helper.listUserForms();
        let deleteResult = [];
        if(allUserForms.length > 0){
            for(let i = 0; i < allUserForms.length; i++) {
                for(const answer of allUserForms[i].questionAnswers.items){
                    deleteResult.push((await helper.callGraphQL(mutations.deleteQuestionAnswer, {input: {"id": answer.id}})));
                }
                deleteResult.push((await helper.callGraphQL(mutations.deleteUserForm, {input: {"id": allUserForms[i].id}})));
            }
            console.log(deleteResult);
        } else console.log("No Userforms active");
    };

    return (
        <div className={style.root}>
            <BrowserRouter>
                {user ?
                    <Fragment>
                        <NavBar
                            user={user}
                            callbackDelete={deleteUserData}
                            setAnswerHistoryOpen={setAnswerHistoryOpen}
                        />
                        {/* <button onClick={() => sendFormDefinition()}>Send form definition to server</button> */}
                        <Content
                            answerHistoryOpen={answerHistoryOpen}
                            setAnswerHistoryOpen={setAnswerHistoryOpen}
                        />
                        <Footer/>
                    </Fragment>
                :
                <Login/>
                }
            </BrowserRouter>
        </div>
    );
}

export default App;