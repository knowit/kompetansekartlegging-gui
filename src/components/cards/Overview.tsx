import { makeStyles, Theme, useScrollTrigger } from '@material-ui/core';
import clsx from 'clsx';
import React, { Fragment, useEffect, useState } from 'react'
import { KnowitColors } from '../../styles';
import { OverviewProps } from '../../types';
import RadarPlot from '../RadarPlot';
import ResultDiagram from '../ResultDiagram';
import Highlights from '../Highlights';
import CloseIcon from '@material-ui/icons/Close';
import { Panel } from '../Content';

const cardCornerRadius: number = 40;
const zIndex: number = 50;

const overviewStyle = makeStyles({
    root: {
        height: '100%',
        width: "100%",
        backgroundColor: KnowitColors.white
    },
    radarPlot: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    mobile: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        justifyContent: 'center',
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

    const buttonClick = () => {
        //TODO: Find a way to replace hadcode int with a something like enum (enum dont work)
        // props.commonCardProps.setActiveCard(props.commonCardProps.index,  !props.commonCardProps.active);
    };


    return (
        props.isMobile ? 
                <div className={props.isOverViewOpen ? styles.mobile : styles.hidden}>
                    <ResultDiagram isMobile={props.isMobile} data={props.radarData} />
                    <Highlights isMobile={props.isMobile} data={props.radarData} />
                </div> 
        :
        // TODO: Put this in a desktop component
        // <div className={clsx(styles.root, props.commonCardProps.active ? styles.open : styles.closed)}>
        //     <div className={props.commonCardProps.active ? styles.radarPlot : styles.empty}>
        <div className={clsx(styles.root, props.commonCardProps.activePanel === Panel.Overview ? styles.open : styles.closed)}>
            <div className={props.commonCardProps.activePanel === Panel.Overview ? styles.radarPlot : styles.empty}>
                <ResultDiagram isMobile={props.isMobile} data={props.radarData} />
                <Highlights isMobile={props.isMobile} data={props.radarData} />
            </div>
        </div>
    );
};
