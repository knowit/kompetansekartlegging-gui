import React from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

const App = () => (
  <div>
    <AmplifySignOut />
    My App
  </div>
);

export default withAuthenticator(App);