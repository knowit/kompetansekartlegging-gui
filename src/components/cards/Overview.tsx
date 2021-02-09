import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { KnowitColors } from '../../styles';
import { OverviewProps } from '../../types';
import ResultDiagram from '../ResultDiagram';
import Highlights from '../Highlights';
import { Panel } from '../Content';

const cardCornerRadius: number = 40;

const overviewStyle = makeStyles({
    root: {
        height: '100%',
        width: "100%",
        backgroundColor: KnowitColors.white,
        display: 'flex',
        flexDirection: 'column'
    },
    radarPlot: {
        height: '100%',
        width: '100%',
        maxWidth: 1200,
        display: 'flex',
        flexDirection: 'column',
    },
    highlightsContainer: {
        width: '100%',
        height: '60%',
        paddingTop: 30,
        paddingLeft: 50,
        marginTop: 20
    },
    mobile: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // overflowY: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    empty: {
        display: "none"
    },

    // card
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
    closed: {
    },
    open: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: '100%',
    },
    hidden: {
        display: 'none'
    }
});

  


export const Overview = ({...props}: OverviewProps) => {
    const styles = overviewStyle();

    // const buttonClick = () => {
    //     //TODO: Find a way to replace hadcode int with a something like enum (enum dont work)
    //     // props.commonCardProps.setActiveCard(props.commonCardProps.index,  !props.commonCardProps.active);
    // };


    return (
        props.userAnswersLoaded ? 
            props.isMobile ? 
                <div className={props.activePanel === Panel.Overview ? styles.mobile : styles.hidden}>
                    <ResultDiagram isMobile={props.isMobile} questionAnswers={props.questionAnswers} categories={props.categories} />
                    <Highlights isMobile={props.isMobile} questionAnswers={props.questionAnswers} />
                </div> 
            :
            // TODO: Put this in a desktop component
            // <div className={clsx(styles.root, props.commonCardProps.active ? styles.open : styles.closed)}>
            //     <div className={props.commonCardProps.active ? styles.radarPlot : styles.empty}>
            <div className={clsx(styles.root, props.activePanel === Panel.Overview ? styles.open : styles.closed)}>
                <div className={props.activePanel === Panel.Overview ? styles.radarPlot : styles.empty}>
                    <ResultDiagram isMobile={props.isMobile} questionAnswers={props.questionAnswers} categories={props.categories} />
                    <div className={styles.highlightsContainer}>
                        <Highlights isMobile={props.isMobile} questionAnswers={props.questionAnswers} />
                    </div>
                </div>
            </div>
        : null
    );
};
