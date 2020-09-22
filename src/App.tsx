import React, { useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import {Button, Box} from '@material-ui/core';
import Form from './components/Form';
import RadarPlot from './components/RadarPlot';
import './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom'

let radar_data: object[] = [];
try {  radar_data = require('./answer-data.json'); }
catch (e) { console.warn("Cant find answer-data.json") }

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState<any|null>(null);

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
    <div className="App">
      <BrowserRouter>
        <div>
          <Box bgcolor="primary.main">
            <p>User: {user ? JSON.stringify(user.attributes.email) : 'None'}</p>
            {user ? (
              <Button color="primary" variant="contained" onClick={() => Auth.signOut()}>Sign Out</Button>
            ) : (
              <Button color="primary" variant="contained" onClick={() => Auth.federatedSignIn()}>Federated Sign In</Button>
            )}
            <Link to="/"><Button color="primary" variant="contained">Home</Button></Link>
            <Link to="/form"><Button color="primary" variant="contained">Form</Button></Link>
            <Link to="/plot"><Button color="primary" variant="contained">Plots</Button></Link>
          </Box>
          <Route exact path="/">
            <div>
              <div style={{height:"400px", width:"400px"}}>
                <RadarPlot data={radar_data}></RadarPlot>
              </div>
              <Form/>
            </div>
          </Route>
          <Route path="/plot">
            <div style={{height:"400px", width:"400px"}}>
              <RadarPlot data={radar_data}></RadarPlot>
            </div>
          </Route>
          <Route path="/form"><Form/></Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;