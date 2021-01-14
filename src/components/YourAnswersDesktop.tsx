import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { Panel } from './Content';
import { KnowitColors } from '../styles';
import { YourAnswerProps } from '../types';
import AnswerDiagram from './AnswerDiagram';
import { Form } from './Form';

const cardCornerRadius: number = 40;
const zIndex: number = 20;

const yourAnwersStyle = makeStyles({
    hidden: {
        display: "none"
    },
    answerBox: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
    },
    answerView: {
        marginRight: 10,
        width: '95%',
        height: '100%',
        borderRadius: 10,
        background: KnowitColors.white,
    },
    form: {
        width: '100%',
        overflowY: 'auto',
        height: '100%'
    },
    leftCard: {
        width: '20%'
    },
    categoryListInner: {
        marginLeft: 10,
        textAlign: 'center'
    },
    cardHeaderOpen: {
        display: "flex",
        paddingTop: cardCornerRadius,
        height: 'max-content',
        backgroundColor: KnowitColors.greyGreen,
    },
    cardHeaderClosed: {
        display: "flex",
        height: 'max-content',

        paddingTop: cardCornerRadius,
        marginTop: -cardCornerRadius,
        boxShadow: '0px 3px 2px gray',
        borderRadius: '0px 0px 20px 20px',

        backgroundColor: KnowitColors.greyGreen
    },
    catHeader: {
        display: 'flex',
        flexDirection: 'row',
        height: '10%',
        margin: '10px',
        maxHeight: '50px'
    },
    graphHolder: {
        width: '100%',
        height: '70%',
    },
    editButton: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        color: KnowitColors.white,
        background: KnowitColors.darkGreen,
        '&:hover': {
            color: KnowitColors.darkGreen
        },
        textTransform: "none"
    },
    catText: {
        width: '80%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonText: {
        textTransform: 'none',
        textAlign: 'left',
        justifyContent: 'left'
    },
    cardButton: {
        fontWeight: "bold",
        fontSize: 18,
        padding: 10,
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        textAlign: "left",
        paddingLeft: 50,
        width: "100%"
    },
    bottomCardClosed: {
        zIndex: zIndex
    },
    bottomCardOpen: {
        display: 'flex',
        flexDirection: 'row',
        overflowY: 'hidden',
        height: '100%'
    },
});

export const YourAnswersDesktop = ({ ...props }: YourAnswerProps) => {
    const style = yourAnwersStyle();

    const scrollRef = React.useRef<HTMLDivElement>(null);

    return (
        // <div className={clsx(props.commonCardProps.active ? style.bottomCardOpen : style.bottomCardClosed)}>
        //     <div className={props.commonCardProps.active ? style.answerBox : style.hidden}>   
        <div className={clsx(props.activePanel === Panel.MyAnswers ? style.bottomCardOpen : style.bottomCardClosed)}>
            <div className={props.activePanel === Panel.MyAnswers ? style.answerBox : style.hidden}>                  
                <div className={clsx(props.answerEditMode ? style.hidden : "", style.answerView)}>
                    <div className={style.catHeader}>
                        <Button className={style.editButton} onClick={() => props.setAnswerEditMode(true)}>Endre svar</Button>
                        <div className={style.catText} >{props.activeCategory}</div>
                    </div>
                    <div className={style.graphHolder}>
                        <AnswerDiagram data={props.answers} activeCategory={props.activeCategory} isMobile={false}/>
                    </div>
                </div>
                <div ref={scrollRef} className={clsx(props.answerEditMode ? "" : style.hidden, style.form)}>
                    <Form 
                        {...props}
                        scrollRef={scrollRef}
                        isMobile={false}
                        alerts={props.alerts}
                    />
                </div>
            </div>
        </div>
    );

};





