import { useScrollTrigger } from '@material-ui/core';
import clsx from 'clsx';
import React, { Fragment, useEffect, useState } from 'react'
import { CardStyle, OverviewStyle } from '../../styles';
import { OverviewProps } from '../../types';
import RadarPlot from '../RadarPlot';
import ResultDiagram from '../ResultDiagram';
import Highlights from '../Highlights';
import CloseIcon from '@material-ui/icons/Close';


export const Overview = ({...props}: OverviewProps) => {
    const style = OverviewStyle();
    const cardStyle = CardStyle({zIndex: 50});

    const buttonClick = () => {
        //TODO: Find a way to replace hadcode int with a something like enum (enum dont work)
        props.commonCardProps.setActiveCard(props.commonCardProps.index,  !props.commonCardProps.active);
    };

    
    return (
        <div className={clsx(style.root, props.commonCardProps.active ? cardStyle.open : cardStyle.closed)}>
            <div className={style.cardHeader}>
                <button 
                    onClick={buttonClick} 
                    className={clsx(cardStyle.cardButton)}
                >
                    OVERSIKT
                </button>
                {props.commonCardProps.active ? (
                        <CloseIcon 
                            fontSize="large" 
                            className={style.closeButton}
                            onClick={buttonClick}    
                        />
                    ) : null}
            </div>
            <div className={props.commonCardProps.active ? style.radarPlot : style.empty}>
                <ResultDiagram data={props.radarData} boolDraw={false} />
                <Highlights data={props.radarData} />
            </div>
            {/* {props.commonCardProps.active ? 
                <div className={style.radarPlot}>
                    <ResultDiagram data={props.radarData} boolDraw={props.isAnswersSubmitted} />
                    <Highlights data={props.radarData} />
                </div>
            : ""} */}
        </div>
    );
};
