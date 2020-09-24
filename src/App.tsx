import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

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
    <Form/>
  </div>
  );
}

export default withAuthenticator(App);