import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react'
import { CardStyle, KnowitColors } from '../../styles';
import { YourAnswerProps } from '../../types';
import Form from '../Form';

const AnswersStyle = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        backgroundColor: KnowitColors.greyGreen
    },
    header: {
    },
    answerBox: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        height: '100%'
    },
    form: {
        width: '80%',
        // flexGrow: 1,
        // flex: '0 1 auto',
        overflowY: 'auto',
        height: '100%'
    },
    categoryList: {
        width: '20%',
        height: '100%'
    },
    categoryListInner: {
        margin: 10
    },
    catgoryButton: {
        width: '100%',
        minHeight: '50px',
        overflow: 'wrap',
        fontSize: 13,
        fontWeight: 'bolder'
    }
});

export const YourAnswers = ({...props}: YourAnswerProps) => {
    const style = AnswersStyle();
    const cardStyle = CardStyle();

    const buttonClick = () => {
        //TODO: Find a way to replace hardcode int with a something like enum (enum dont work)
        props.commonCardProps.setActiveCard(props.commonCardProps.index,  !props.commonCardProps.active);
    };

    const getCategoryButtons = () => {
        let buttons: JSX.Element[] = [];
        props.categories.forEach(cat => {
            buttons.push(
                <button 
                    key={cat}
                    className={style.catgoryButton} 
                    onClick={() => props.changeActiveCategory(cat)}
                >{cat}</button>
            );
        });
        return buttons;
    };

    return (
        <div className={clsx(style.root, props.commonCardProps.active ? cardStyle.open : cardStyle.closed)}>
            <div className={style.header}>
                <button 
                    onClick={buttonClick} 
                    className={clsx(cardStyle.cardButton)}
                >
                    YOUR ANSWERS
                </button>
            </div>
            {props.commonCardProps.active ?
                <div className={style.answerBox}>
                    <div className={style.categoryList}>
                        <div className={style.categoryListInner}>
                            <button onClick={props.createUserForm} >Submit Answers</button>
                            {getCategoryButtons()}
                        </div>
                    </div>
                    <div className={style.form}>
                        <Form {...props}/>
                    </div>
                </div>
            : ""}
        </div>
    );
};
