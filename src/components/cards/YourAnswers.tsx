import clsx from 'clsx';
import React from 'react'
import { AnswersStyle, CardStyle } from '../../styles';
import { YourAnswerProps } from '../../types';
import Form from '../Form';

export const YourAnswers = ({...props}: YourAnswerProps) => {
    const style = AnswersStyle();
    const cardStyle = CardStyle();

    const buttonClick = () => {
        //TODO: Find a way to replace hadcode int with a something like enum (enum dont work)
        props.commonCardProps.setActiveCard(props.commonCardProps.index,  !props.commonCardProps.active);
    };

    return (
        <div className={clsx(style.root, props.commonCardProps.active ? cardStyle.open : cardStyle.closed)}>
            <div >
                <button 
                    onClick={buttonClick} 
                    className={clsx(cardStyle.cardButton)}
                >
                    YOUR ANSWERS
                </button>
            </div>
            {props.commonCardProps.active ? 
                <div >
                    <Form {...props} />
                </div>
            : ""}
        </div>
    );
};
