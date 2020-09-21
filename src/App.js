import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import {Button, Box} from '@material-ui/core';
import Form from './components/Form';
import RadarPlot from './components/RadarPlot';
import './App.css';

let radar_data = require('./answer-data.json'); //Temp data

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState(null);

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
      <Box bgcolor="primary.main">
        <p>User: {user ? JSON.stringify(user.attributes.email) : 'None'}</p>
        {user ? (
          <Button color="primary" variant="contained" onClick={() => Auth.signOut()}>Sign Out</Button>
        ) : (
          <Button color="primary" variant="contained" onClick={() => Auth.federatedSignIn()}>Federated Sign In</Button>
        )}
      </Box>
      <div style={{height:"400px", width:"400px"}}>
          <RadarPlot data={radar_data}></RadarPlot>
      </div>
      <div className="App">
        <Form/>
      </div>
    </div>
  );
}

export default App;