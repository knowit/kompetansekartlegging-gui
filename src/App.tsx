import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import Amplify, { Auth, Hub, API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import { AnsweredQuestion } from './types';
import RadarPlot from './components/RadarPlot';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { setConstantValue } from 'typescript';

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
  },{
    question: {
      text: "Text 2",
      topic: "Topic 2",
      group: "Group 1",
      category: "Category 1"
    },
    answer: 3
  },{
    question: {
      text: "Text 3",
      topic: "Topic 3",
      group: "Group 1",
      category: "Category 2"
    },
    answer: 3
  },{
    question: {
      text: "Text 4",
      topic: "Topic 4",
      group: "Group 1",
      category: "Category 2"
    },
    answer: 5
  },{
    question: {
      text: "Text 5",
      topic: "Topic 5",
      group: "Group 1",
      category: "Category 4"
    },
    answer: 2
  },
]

var formDef = require('./form2.json')

function App() {
  const [user, setUser] = useState<any | null>(null);
  const [formDefinition, setFormDefinition] = useState<any | null>(null);

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

    getFormDefinition().then(f => setFormDefinition(f));

  }, []);

  async function getFormDefinition(){
    return API.graphql(graphqlOperation(queries.getFormDefinition, {id: "fd1"}));
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
    var i;
    var question;
    var qid;
    var fdid = "fd1";
    var res = await API.graphql(graphqlOperation(mutations.createFormDefinition, {input: {"id": fdid}}));
    for (i = 0; i < formDef.length; i++) {
      question = formDef[i];
      qid = "q" + i;
      res = await API.graphql(graphqlOperation(mutations.createQuestion, {input: {...question, "id": qid}}));
      console.log(res);
      res = await API.graphql(graphqlOperation(mutations.createQuestionFormDefinitionConnection, {input: {"formDefinitionID": fdid, "questionID": qid, "id": fdid + qid}}));
      console.log(res);
    }
  }

  return (
  <div>
    <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
    <button onClick={() => sendFormDefinition()}>Send form definition to server</button>
    <AmplifySignOut />
    My App
    <div style={{height: '500px', width: '500px'}}><RadarPlot data={testData}/></div>
    <Form formDefinition={formDefinition}/>
  </div>
  );
}

export default withAuthenticator(App);