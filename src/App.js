import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import {Button, Box} from '@material-ui/core';
import Form from './components/Form';
import './App.css';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries.ts';

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(0);

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

  async function getData() {
    return API.graphql(graphqlOperation(queries.listFormDefinitions));
  }

  async function getAndUpdateData() {
    const data = await getData();
    setData(data);
  }

  return (
    <div>
      <Box bgcolor="primary.main">
        <p>User: {user ? JSON.stringify(user.attributes.email) : 'None'}</p>
        <p>{JSON.stringify(data)}</p>
        {user ? (
          <Button color="primary" variant="contained" onClick={() => Auth.signOut()}>Sign Out</Button>
        ) : (
          <Button color="primary" variant="contained" onClick={() => Auth.federatedSignIn()}>Federated Sign In</Button>
        )}
          <Button variant="contained" onclick={() => getAndUpdateData()}>Get data!</Button>
      </Box>
      <div className="App">
        <Form/>
      </div>
    </div>
  );
}

export default App;