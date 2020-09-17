import React, { Component } from 'react'
import Question from './Question';
let questionFile = "";
try {
    questionFile = require('../form.json');
}
catch (e) {
    console.warn("Cant find form.json")
}

export default class Form extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            questions: [],
            answers:{},
            testData: questionFile
        }

        this.printAllAnswers = this.printAllAnswers.bind(this);    
        
        let qs = [];
        for (const [key, value] of Object.entries(questionFile)) {
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
    
    printAllAnswers() {
        console.log(this.state.answers);
    }

    updateAnswer = (key, rating) => {
        //Note asynchronicity, if really quick, rating might be unset.
        this.setState(prevState => {
            let dumdum = {answers: {...prevState.answers}};
            dumdum.answers[key].rating = rating;
            return dumdum;
        })
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
