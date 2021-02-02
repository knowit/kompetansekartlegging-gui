import { makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import { QuestionAnswer } from '../types';
import React, { Fragment } from 'react';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import UpdateIcon from '@material-ui/icons/Update';
import { staleAnswersLimit } from './AlertNotification';


const useStyles = makeStyles({
    blockAlert: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        color: KnowitColors.darkBrown
    },
    warningText: {
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fontSize: '16px',
        marginLeft: 10
    },
});

export enum AlertType {
    Incomplete,
    Outdated,
    Multiple
}

export const BlockInfo = (props: {questions: QuestionAnswer[] | undefined}) => {

    const classes = useStyles();

    enum TimeType {
        MINUTES, // For testing
        DAYS,
    }

    const timeBetweenString = (then: number, now: number, type: TimeType): string => {
        switch(type) {
            case TimeType.MINUTES:
                return Math.round((now-then) / (1000*60)) + " minutter";
            case TimeType.DAYS:
                return Math.round((now-then) / (1000*60*60*24)) + " dager";
        }
    }

    let answeredQuestions =  props.questions?.filter(question => 
        question.motivation != -1 && question.knowledge != -1 
    );

    let now = Date.now();
    var timeOfOldestQuestion = now;
    answeredQuestions?.forEach((question) => {
        if (question.updatedAt < timeOfOldestQuestion)
            timeOfOldestQuestion = question.updatedAt;
    });
    let timeDiff = now - timeOfOldestQuestion;
    
    if (now - timeOfOldestQuestion != 0) {
        if (timeDiff > staleAnswersLimit) {
            return  <div className={classes.blockAlert}>
                        <UpdateIcon/>
                        <div className={classes.warningText}>{`Det har gått ${timeBetweenString(timeOfOldestQuestion, now, TimeType.MINUTES)} siden blokken ble oppdatert!`}</div>                
                    </div>;
        } else {
            return  <div className={classes.blockAlert}>
                        <CheckCircleOutlineRoundedIcon/>
                        <div className={classes.warningText}>{`Blokken ble sist oppdatert ${new Date(timeOfOldestQuestion).toLocaleDateString('no-NO')}`}</div>                
                    </div>;
        }
    } else {
        return <Fragment/>;
    }
}