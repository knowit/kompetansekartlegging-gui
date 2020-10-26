import { Button, makeStyles } from '@material-ui/core';
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
        overflowY: 'auto',
        height: '100%'
    },
    categoryList: {
        width: '20%',
        height: '100%'
    },
    categoryListInner: {
        marginLeft: 10
    },
    buttonGeneral: {
        width: '100%',
        overflow: 'wrap',
        fontSize: 13,
        fontWeight: 'bolder',
        border: 'none',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    categoryButton: {
        backgroundColor: KnowitColors.greyGreen,
        '&:hover': {
            background: KnowitColors.lightGreen
        },
    },
    categoryButtonActive: {
        backgroundColor: KnowitColors.lightGreen
    },
    submitButton: {
        backgroundColor: KnowitColors.ecaluptus,
        '&:hover': {
            background: KnowitColors.flamingo
        },
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
                <Button 
                    key={cat}
                    className={clsx(
                        style.buttonGeneral,
                        style.categoryButton, 
                        props.activeCategory === cat ? style.categoryButtonActive : ""
                    )} 
                    onClick={() => props.changeActiveCategory(cat)}
                >{cat}</Button>
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
                            {props.categories.length > 0
                                ? <Button 
                                    onClick={props.createUserForm} 
                                    className={clsx(style.buttonGeneral, style.submitButton)} 
                                 >Submit Answers</Button>
                                : ""
                            }
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
