import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import Amplify, {Auth, Hub, API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries'
import * as helper from './helperFunctions'
import Content from './components/Content';
import NavBar from './components/NavBar';
import { Footer } from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import { makeStyles } from '@material-ui/core';
import * as qustomQueries from './graphql/custom-queries'
import { Category } from './types'

awsconfig.oauth.redirectSignIn = `${window.location.origin}/`;
awsconfig.oauth.redirectSignOut = `${window.location.origin}/`;

Amplify.configure(awsconfig);


type FormType = {
    topic: String,
    category: String,
    text: String
};
const formDef: FormType[] = require('./form3.json');

const appStyle = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    content: {
        height: '100%',
        flexGrow: 1
    }
});

const App = () => {
    const style = appStyle();

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

        // Get all categories, create categories that dont exists, create form def

        let categories: Category[] = (await helper.callGraphQL<{ listCategorys: { items: [Category] } }>(queries.listCategorys)).data?.listCategorys.items || [];
        console.log("Listed categories: ", categories);
        const missingCategories: String[] = formDef.map(item => {
            if(!categories.some(cat => cat.text === item.category))
                return item.category;
            return "";
        }).filter((v, i, a) => a.indexOf(v) === i);

        console.log("Missing categories: ", missingCategories);

        for(let i = 0; i < missingCategories.length; i++){
            if(missingCategories[i] === "") continue;
            let input = {
                text: missingCategories[i],
                description: ""
            }
            console.log("New category input: ", input);
            let newCat = (await helper.callGraphQL<{createCategory: Category}>(mutations.createCategory, {input: input})).data?.createCategory;
            if(newCat) categories.push(newCat);
        }

        console.log("Total categories: ", categories);

        let formId = (await helper.callGraphQL<{ createFormDefinition: { id: String } }>(mutations.createFormDefinition, qustomQueries.createFormDefinitionInputConsts)).data?.createFormDefinition.id;
        
        console.log("Created form definition with id: ", formId);

        console.log("Start creating questions, wait for them to complete before reloading site....");
        for (let i = 0; i < formDef.length; i++) {
            let input = {
                categoryID: categories.find(cat => cat.text === formDef[i].category)?.id,
                formDefinitionID: formId,
                topic: formDef[i].topic,
                text: formDef[i].text
            }
            if(input.categoryID && input.formDefinitionID){
                let newQuestion = await helper.callGraphQL(mutations.createQuestion, {input: input});
                console.log("Created question: ", newQuestion);
            } else {
                console.log("ERROR: Missing required data for question: ", input);
            }
        }
        console.log("Question creation completed!");
    };

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
                <Login />
                }
            </BrowserRouter>
        </div>
    );
}

export default App;