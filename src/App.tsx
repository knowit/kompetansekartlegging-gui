import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import Amplify, { Auth, Hub, API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import * as mutations from './graphql/mutations';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

var formDef = require('./form2.json')

function App() {
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

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  async function sendFormDefinition() {
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
    <Form/>
  </div>
  );
}

export default withAuthenticator(App);