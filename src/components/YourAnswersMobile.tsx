import { Button, ButtonBase, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { KnowitColors } from '../styles';
import { YourAnswerProps } from '../types';
import AnswerDiagram from './AnswerDiagram';
import { Form } from './Form';
import { MenuButton, Panel } from './Content';
import { AlertNotification, AlertType } from './AlertNotification';


const cardCornerRadius: number = 40;
// const zIndex: number = 10000;

const yourAnswersStyleMobile = makeStyles({
    hidden: {
        display: "none"
    },
    answerBox: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    answerView: {
        marginRight: 10,
        marginLeft: 10,
        width: '95%',
        height: '100%',
        borderRadius: 10,
        background: KnowitColors.white,
        // position: 'absolute'
    },
    form: {
        width: '100%',
        // overflowY: 'auto',
        height: '100%'
    },
    categoryList: {
        height: 'min-content',
        backgroundColor: KnowitColors.beige,
        borderRadius: '0px 0px 35px 35px',
        paddingBottom: '25px',
        boxShadow: "0px 3px 0px grey",
        marginBottom: "8px",
    },
    leftCard: {
        width: '100%',
        overflowY: 'auto'
    },
    categoryListInner: {
        // marginLeft: 10,
        textAlign: 'center',
        display: "flex",
        flexDirection: "column"
    },
    buttonGeneral: {
        overflow: 'wrap',
        fontSize: 13,
        fontWeight: 'bolder',
        border: 'none',
        justifyContent: 'left'
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
    yourAnswersMobileContainer: {
        height: '100%'
    },
    menuButtonActive: {
        background: KnowitColors.white,
    },
    MenuButton: {
        // borderTopLeftRadius: cardCornerRadius,
        // borderBottomLeftRadius: cardCornerRadius,
        '&:hover': {
            background: KnowitColors.white
        },
        overflow: 'wrap',
        fontSize: 13,
        fontWeight: 'bolder',
        border: 'none',
        justifyContent: 'left',
        borderRadius: '0px 17px 17px 0px'

    },
});


export const YourAnswersMobile = ({ ...props }: YourAnswerProps) => {
    const style = yourAnswersStyleMobile();

    const getCategoryButtons = () => {
        let buttons: JSX.Element[] = [];

        const categories = props.categories.map((cat) => {
            return { text: cat, buttonType: MenuButton.Category, activePanel: Panel.MyAnswers }
        })

        categories.forEach((category, index) => {
            buttons.push(
                <Button
                    key={category.text}
                    className={clsx(style.MenuButton, props.activeCategory === category.text ? style.menuButtonActive : "",
                        props.activePanel === category.activePanel ? "" : style.hidden)}
                    onClick={() => { props.checkIfCategoryIsSubmitted(category.buttonType, category.text) }}
                >
                    <div className={clsx(style.buttonText)}>{index + 1}. {category.text}</div>
                    {props.alerts?.categoryMap.has(category.text) ? <AlertNotification type={AlertType.Multiple} message="Ikke besvart eller utdaterte spørsmål i kategori" size={props.alerts.categoryMap.get(category.text)}/> : ""}
                </Button>
            )
        });
        return buttons;
    }

    useEffect(() => {
        console.log("COLLAPSE")
    },[props.collapseMobileCategories])
    

    return (
        <div className={props.activePanel === Panel.MyAnswers ? style.yourAnswersMobileContainer : style.hidden}>
            <div className={style.leftCard} >
                {/* <div className={props.commonCardProps.active ? style.categoryList : style.hidden}> */}
                <div className={props.activePanel === Panel.MyAnswers ? style.categoryList : style.hidden}>
                    <div className={style.categoryListInner}>
                        
                        {getCategoryButtons()}
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
                <div className={clsx(props.answerEditMode ? "box" : style.hidden, style.form)}>
                    {/* <Button onClick={() => props.answerViewModeActive(true)}>TEMP</Button> */}
                    <Form 
                        {...props}
                        isMobile={true}
                        alerts={props.alerts}
                    />
                </div>
            </div>
        </div>
    );

};





