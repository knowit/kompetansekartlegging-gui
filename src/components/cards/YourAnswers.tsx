import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react'
import { CardStyle, KnowitColors, cardCornerRadius } from '../../styles';
import { YourAnswerProps } from '../../types';
import { Form } from '../Form';
import CloseIcon from '@material-ui/icons/Close';
import { AlertDialog } from '../AlertDialog';
import AnswerDiagram from '../AnswerDiagram';
import CloseIcon from '@material-ui/icons/Close';

const AnswersStyle = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        backgroundColor: KnowitColors.greyGreen
    },
    hidden: {
        display: "none"
    },
    answerBox: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        height: '100%'
    },
    answerView: {
        width: '80%',
        height: '20vw',
        overflowY: 'auto',
        borderRadius: 10,
        background: KnowitColors.white
    },
    answerViewContainer: {
        display: 'flex'
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
        marginTop: 10,
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
    },
    categoryButtonActive: {
        backgroundColor: KnowitColors.white
    },
    cardHeader: {
        display: "flex",
        marginTop: cardCornerRadius,
        height: cardCornerRadius
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
        height: '10%'
    },
    graphHolder: {
        height: '80%',
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
    }
});

export const YourAnswers = ({...props}: YourAnswerProps) => {
    const style = AnswersStyle();
    const cardStyle = CardStyle({zIndex: 20});
  
    const [isCategorySubmitted, setIsCategorySubmitted] = useState<boolean>(true);
    const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
    const [clickedCategory, setClickedCategory] = useState<string>(''); // used in the alertbox to choose what category to go to

    const saveBeforeChange = (cat : string) => {
        if(!isCategorySubmitted) {
            setAlertDialogOpen(true)
            setClickedCategory(cat)
        } else {
            props.changeActiveCategory(cat)
        }
    }
    
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
                    onClick={() => { saveBeforeChange(cat)}}
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
            <div className={props.commonCardProps.active ? "" : style.hidden}>
                <div className={style.answerBox}>
                    <div className={style.categoryList}>
                        <div className={style.categoryListInner}>
                            {getCategoryButtons()}
                        </div>
                    </div>
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
                        <Form {...props} setIsCategorySubmitted={setIsCategorySubmitted} isCategorySubmitted={isCategorySubmitted}/>
                    </div>
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
