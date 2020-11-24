import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react'
import { CardStyle, KnowitColors, cardCornerRadius } from '../../styles';
import { YourAnswerProps } from '../../types';
import { Form } from '../Form';
import CloseIcon from '@material-ui/icons/Close';
import { AlertDialog } from '../AlertDialog';
import AnswerDiagram from '../AnswerDiagram';

const AnswersStyle = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        backgroundColor: KnowitColors.white,//KnowitColors.greyGreen
    },
    hidden: {
        display: "none"
    },
    answerBox: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        height: '100%',
        marginTop: '40px',
        width: '80%',
    },
    answerView: {
        marginRight: 10,
        width: '95%',
        height: '100%',
        overflowY: 'auto',
        borderRadius: 10,
        background: KnowitColors.white,
    },
    answerViewContainer: {
        display: 'flex'
    },
    form: {
        // width: '80%',
        overflowY: 'auto',
        height: '100%'
    },
    categoryList: {
        // width: '20%',
        height: 'min-content',
        backgroundColor: KnowitColors.greyGreen,
        borderRadius: '0px 0px 20px 20px',
        paddingBottom: '20px',
        boxShadow: "0px 3px 0px grey",
        marginBottom: "8px",
    },
    leftCard: {
        width: '20%'
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
        // width: '20%',
        display: "flex",
        // marginTop: cardCornerRadius,
        paddingTop: cardCornerRadius,
        // height: cardCornerRadius,
        height: 'max-content',
        backgroundColor: KnowitColors.greyGreen,
    },
    cardHeaderClosed: {
        // width: '20%',
        display: "flex",
        // marginTop: cardCornerRadius,
        // paddingTop: cardCornerRadius,
        // height: cardCornerRadius,
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
});

export const YourAnswers = ({ ...props }: YourAnswerProps) => {
    const style = AnswersStyle();
    const cardStyle = CardStyle({ zIndex: 20 });

    const [isCategorySubmitted, setIsCategorySubmitted] = useState<boolean>(true);
    const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
    const [clickedCategory, setClickedCategory] = useState<string>(''); // used in the alertbox to choose what category to go to

    const saveBeforeChange = (cat: string) => {
        if (!isCategorySubmitted) {
            setAlertDialogOpen(true)
            setClickedCategory(cat)
        } else {
            props.changeActiveCategory(cat)
        }
    }

    const buttonClick = () => {
        //TODO: Find a way to replace hardcode int with a something like enum (enum dont work)
        props.commonCardProps.setActiveCard(props.commonCardProps.index, !props.commonCardProps.active);
    };

    const getCategoryButtons = (): JSX.Element[] => {
        let buttons: JSX.Element[] = [];
        let orderNumber: number = 1;
        props.categories.forEach(cat => {
            buttons.push(
                <Button
                    key={cat}
                    className={clsx(
                        style.buttonGeneral,
                        style.categoryButton,
                        props.activeCategory === cat ? style.categoryButtonActive : ""
                    )}
                    onClick={() => { saveBeforeChange(cat) }}
                    ><div className={style.buttonText}>{orderNumber}. {cat}</div></Button>
            );
            orderNumber++;
        });
        return buttons;
    };

    

    return (
        <div className={clsx(props.commonCardProps.active ? cardStyle.bottomCardOpen : cardStyle.bottomCardClosed)}>
            <div className={style.leftCard}>
                <div className={props.commonCardProps.active ? style.cardHeaderOpen : style.cardHeaderClosed}>
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
                <div className={props.commonCardProps.active ? style.categoryList : style.hidden}>
                    <div className={style.categoryListInner}>
                        {getCategoryButtons()}
                    </div>
                </div>
            </div>
            <div className={props.commonCardProps.active ? style.answerBox : style.hidden}>                    
                    <div className={clsx(props.answerViewMode ? "" : style.hidden, style.answerView)}>
                        <div className={style.catHeader}>
                            <Button className={style.editButton} onClick={() => props.answerViewModeActive(false)}>Endre svar</Button>
                            <div className={style.catText} >{props.activeCategory}</div>
                        </div>
                        <div className={style.graphHolder}>
                            <AnswerDiagram data={props.answers} activeCategory={props.activeCategory} />
                        </div>
                    </div>
                    <div className={clsx(props.answerViewMode ? style.hidden : "", style.form)}>
                        {/* <Button onClick={() => props.answerViewModeActive(true)}>TEMP</Button> */}
                        <Form {...props} setIsCategorySubmitted={setIsCategorySubmitted} isCategorySubmitted={isCategorySubmitted} />
                    </div>
                <AlertDialog
                    setAlertDialogOpen={setAlertDialogOpen}
                    alertDialogOpen={alertDialogOpen}
                    changeActiveCategory={props.changeActiveCategory}
                    clickedCategory={clickedCategory}
                    setIsCategorySubmitted={setIsCategorySubmitted}
                    resetAnswers={props.resetAnswers}
                />
            </div>
        </div>
    );

};
