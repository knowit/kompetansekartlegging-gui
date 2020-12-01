import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react'
import { KnowitColors } from '../../styles';
import { YourAnswerProps } from '../../types';
import { Form } from '../Form';
import CloseIcon from '@material-ui/icons/Close';
import { AlertDialog } from '../AlertDialog';
import AnswerDiagram from '../AnswerDiagram';

const cardCornerRadius: number = 40;
const zIndex: number = 20;

const yourAnwersStyle = makeStyles({
    hidden: {
        display: "none"
    },
    answerBox: {
        display: 'flex',
        flexDirection: 'row',
        height: '80%',
        marginTop: '40px',
        width: '80%',
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
    categoryList: {
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
        position: 'relative',
        marginTop: -cardCornerRadius,
        display: 'flex',
        flexDirection: 'row',
        overflowY: 'auto',
        height: '100%',
        zIndex: zIndex
    },
});

export const YourAnswers = ({ ...props }: YourAnswerProps) => {
    const style = yourAnwersStyle();

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
        <div className={clsx(props.commonCardProps.active ? style.bottomCardOpen : style.bottomCardClosed)}>
            <div className={style.leftCard}>
                <div className={props.commonCardProps.active ? style.cardHeaderOpen : style.cardHeaderClosed}>
                    <button
                        onClick={buttonClick}
                        className={clsx(style.cardButton)}
                    >
                        MINE SVAR
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
