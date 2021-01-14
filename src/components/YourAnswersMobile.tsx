import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { KnowitColors } from '../styles';
import { YourAnswerPropsMobile } from '../types';
import AnswerDiagram from './AnswerDiagram';
import { Form } from './Form';
import { Panel } from './Content';


const cardCornerRadius: number = 40;
// const zIndex: number = 10000;

const yourAnswersStyleMobile = makeStyles({
    hidden: {
        display: "none"
    },
    answerBox: {
        display: 'flex',
        flexDirection: 'column',
        // height: 'fit-content',
        // marginTop: '40px',
        width: '100%',
    },
    answerView: {
        marginRight: 10,
        marginLeft: 10,
        width: '95%',
        height: '100%',
        borderRadius: 10,
        background: KnowitColors.white,
        position: 'absolute'
    },
    form: {
        width: '100%',
        overflowY: 'auto',
        height: '100%'
    },
    categoryList: {
        height: 'min-content',
        backgroundColor: KnowitColors.greyGreen,
        borderRadius: '0px 0px 35px 35px',
        paddingBottom: '25px',
        boxShadow: "0px 3px 0px grey",
        marginBottom: "8px",
    },
    leftCard: {
        width: '100%'
    },
    categoryListInner: {
        marginLeft: 10,
        textAlign: 'center'
    },
    buttonGeneral: {
        overflow: 'wrap',
        fontSize: 13,
        fontWeight: 'bolder',
        border: 'none'
    },
    categoryButton: {
        width: '100%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: KnowitColors.greyGreen,
        '&:hover': {
            background: KnowitColors.white
        },
        justifyContent: 'left'
    },
    categoryButtonActive: {
        backgroundColor: KnowitColors.white
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

    closeButton: {
        marginTop: "3px",
        marginRight: "32px",
        '&:hover': {
            color: KnowitColors.darkGreen
        }
    },
    catHeader: {
        display: 'flex',
        flexDirection: 'row',
        height: '10%',
        margin: '10px'

    },
    graphHolder: {
        width: '100%',
        height: '85%',
        // borderRadius: 10,
        // background: KnowitColors.creme,
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
        // zIndex: zIndex
    },
    myAnswersStyle: {
        position: 'relative',
        // marginTop: -cardCornerRadius,
        // display: 'flex',
        // flexDirection: 'row',
        overflowY: 'auto',
        height: '100%',
        // zIndex: zIndex
    },
});


export const YourAnswersMobile = ({ ...props }: YourAnswerPropsMobile) => {
    const style = yourAnswersStyleMobile();

    const scrollRef = React.useRef<HTMLDivElement>(null);

    return (
        <div>
            <div className={style.leftCard}>
                {/* <div className={props.commonCardProps.active ? style.categoryList : style.hidden}> */}
                <div className={props.activePanel === Panel.MyAnswers ? style.categoryList : style.hidden}>
                    <div className={style.categoryListInner}>
                        
                        {props.getCategoryButtons(style)}
                    </div>
                </div>
            </div>
            {/* <div className={props.commonCardProps.active ? style.answerBox : style.hidden}> */}
            <div className={props.activePanel === Panel.MyAnswers ? style.answerBox : style.hidden}>                     
                <div className={clsx(props.answerEditMode ? style.hidden : "", style.answerView)}>
                    <div className={style.catHeader}>
                        <Button className={style.editButton} onClick={() => props.setAnswerEditMode(true)}>Oppdater</Button>
                        {/* <div className={style.catText} >{props.activeCategory}</div> */}
                    </div>
                    <div className={style.graphHolder}>
                        <AnswerDiagram data={props.answers} activeCategory={props.activeCategory} isMobile={true}/>
                    </div>
                </div>
                <div ref={scrollRef} className={clsx(props.answerEditMode ? "box" : style.hidden, style.form)}>
                    {/* <Button onClick={() => props.answerViewModeActive(true)}>TEMP</Button> */}
                    <Form 
                        {...props}
                        isMobile={true}
                        alerts={props.alerts}
                        scrollRef={scrollRef}
                    />
                </div>
            </div>
        </div>
    );

};





