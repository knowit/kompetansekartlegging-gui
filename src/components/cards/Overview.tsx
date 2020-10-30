import { useScrollTrigger } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { CardStyle, OverviewStyle } from '../../styles';
import { OverviewProps } from '../../types';
import RadarPlot from '../RadarPlot';
import ResultDiagram from '../ResultDiagram';
import Highlights from '../Highlights';
import CloseIcon from '@material-ui/icons/Close';


export const Overview = ({...props}: OverviewProps) => {
    const style = OverviewStyle();
    const cardStyle = CardStyle();

    const [drawGraph, setDrawGraph] = useState<boolean>(true);

    useEffect(() => {
        setDrawGraph(props.commonCardProps.active);
    }, [props.commonCardProps.active]);

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
                    OVERVIEW
                </button>
                {props.commonCardProps.active ? (
                        <CloseIcon 
                            fontSize="large" 
                            className={style.closeButton}
                            onClick={buttonClick}    
                        />
                    ) : null}
            </div>
            {props.commonCardProps.active ? 
                <div className={style.radarPlot}>
                    <ResultDiagram data={props.radarData} boolDraw={drawGraph} />
                    <Highlights data={props.radarData} />
                </div>
            : ""}
        </div>
    );
};
