import clsx from 'clsx';
import React from 'react'
import { CardStyle, OverviewStyle } from '../../styles';
import { OverviewProps } from '../../types';
import RadarPlot from '../RadarPlot';
import ResultDiagram from '../ResultDiagram';


export const Overview = ({...props}: OverviewProps) => {
    const style = OverviewStyle();
    const cardStyle = CardStyle();

    const buttonClick = () => {
        //TODO: Find a way to replace hadcode int with a something like enum (enum dont work)
        props.commonCardProps.setActiveCard(props.commonCardProps.index,  !props.commonCardProps.active);
    };

    

    return (
        <div className={clsx(style.root, props.commonCardProps.active ? cardStyle.open : cardStyle.closed)}>
            <div >
                <button 
                    onClick={buttonClick} 
                    className={clsx(cardStyle.cardButton)}
                >
                    OVERVIEW
                </button>
            </div>
            {props.commonCardProps.active ? 
                <div className={style.radarPlot}>
                    {/* <ResultDiagram data={props.radarData} /> */}
                </div>
            : ""}
        </div>
    );
};
