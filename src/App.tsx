import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AnsweredQuestion } from './types';
import RadarPlot from './components/RadarPlot';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

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


async function sendFormDefinition() {
  var i;
  for (i = 0; i < formDef.length; i++) {
    console.log(formDef[i])
  }
  var user;
  user = await Auth.currentAuthenticatedUser();
  console.log(user);
}

sendFormDefinition()

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

  return (
  <div>
    <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
    <AmplifySignOut />
    My App
    <div style={{height: '500px', width: '500px'}}><RadarPlot data={testData}/></div>
    <Form/>
  </div>
  );
}

export default withAuthenticator(App);