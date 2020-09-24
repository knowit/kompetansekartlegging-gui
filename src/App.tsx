import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AnsweredQuestion } from './types';
import RadarPlot from './components/RadarPlot';

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
      category: "Category 3"
    },
    answer: 2
  },
]

const App = () => (
  <div>
    <AmplifySignOut />
    My App
    <div style={{height: '500px', width: '500px'}}><RadarPlot data={testData}/></div>
    
    <Form/>
  </div>
);

export default withAuthenticator(App);