import React, { Component } from 'react'
import Question from './Question';
const questionFile = require('../form.json')

export default class Form extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            questions: [],
            answers:{},
            testData: questionFile
        }

        this.createQuestions(this.state.testData);
        this.printAllAnswers = this.printAllAnswers.bind(this);        
    }
    
    printAllAnswers() {
        console.log(this.state.answers);
    }

    updateAnswer = (key, rating) => {

        this.setState(prevState => {
            let dumdum = {answers: {...prevState.answers}};
            dumdum.answers[key].rating = rating;
            return dumdum;
        })
    }

    createQuestions(jsonFile) {
        let qs = [];
        for (const [key, value] of Object.entries(jsonFile)) {
            qs.push(
            <Question 
                key={key} 
                listID={key} 
                text={value.text} 
                topic={value.topic}
                updateAnswer={this.updateAnswer}
            />
            );
            this.state.answers[key] = {topic: value.topic, category: value.category, rating: ""};
          }
        this.state.questions = qs;
    }

    render() {
        return (
            <div className="form"> 
                {this.state.questions}
                <button onClick={this.printAllAnswers}>Print all</button>
            </div>
        )
    }
}
