import { makeStyles, Theme, useScrollTrigger } from '@material-ui/core';
import clsx from 'clsx';
import React, { Fragment, useEffect, useState } from 'react'
import { KnowitColors } from '../../styles';
import { OverviewProps } from '../../types';
import RadarPlot from '../RadarPlot';
import ResultDiagram from '../ResultDiagram';
import Highlights from '../Highlights';
import CloseIcon from '@material-ui/icons/Close';

const cardCornerRadius: number = 40;
const zIndex: number = 50;

const overviewStyle = makeStyles({
    root: {
        maxHeight: '40%',
        width: "100%",
        backgroundColor: KnowitColors.white
    },
    radarPlot: {
        height: '100%',
        width: '100%',
        display: 'flex',
        overflowY: 'auto',
        justifyContent: 'center'
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
        position: 'relative',
        marginTop: -cardCornerRadius,
        boxShadow: "0px 3px 2px grey",
        borderBottomLeftRadius: cardCornerRadius,
        borderBottomRightRadius: cardCornerRadius,
        zIndex: zIndex
    },
    open: {
        position: 'relative',
        marginTop: -cardCornerRadius,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: '100%',
        boxShadow: "0px 3px 2px grey",
        borderBottomLeftRadius: cardCornerRadius,
        borderBottomRightRadius: cardCornerRadius,
        zIndex: zIndex
    },
});

  


export const Overview = ({...props}: OverviewProps) => {
    const styles = overviewStyle();

    const buttonClick = () => {
        //TODO: Find a way to replace hadcode int with a something like enum (enum dont work)
        props.commonCardProps.setActiveCard(props.commonCardProps.index,  !props.commonCardProps.active);
    };

    
    return (
        <div className={clsx(styles.root, props.commonCardProps.active ? styles.open : styles.closed)}>
            <div className={styles.cardHeader}>
                <button 
                    onClick={buttonClick} 
                    className={clsx(styles.cardButton)}
                >
                    OVERSIKT
                </button>
                {props.commonCardProps.active ? (
                        <CloseIcon 
                            fontSize="large" 
                            className={styles.closeButton}
                            onClick={buttonClick}    
                        />
                    ) : null}
            </div>
            <div className={props.commonCardProps.active ? styles.radarPlot : styles.empty}>
                <ResultDiagram data={props.radarData} />
                <Highlights data={props.radarData} />
            </div>
        </div>
    );
};
