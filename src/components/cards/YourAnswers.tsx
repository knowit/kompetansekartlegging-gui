import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react'
import { AnswersStyle, CardStyle, KnowitColors } from '../../styles';
import { YourAnswerProps } from '../../types';
import { Form } from '../Form';
import CloseIcon from '@material-ui/icons/Close';


export const YourAnswers = ({...props}: YourAnswerProps) => {
    const style = AnswersStyle();
    const cardStyle = CardStyle({zIndex: 20});

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
            <div className={style.cardHeader}>
                <button 
                    onClick={buttonClick} 
                    className={clsx(cardStyle.cardButton)}
                >
                    DINE SVAR
                </button>
                {props.commonCardProps.active ? (
                        <CloseIcon 
                            fontSize="large" 
                            className={style.closeButton}
                            onClick={buttonClick}    
                        />
                    ) : null}
            </div>
            {props.commonCardProps.active ?
                <div className={style.answerBox}>
                    <div className={style.categoryList}>
                        <div className={style.categoryListInner}>
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
