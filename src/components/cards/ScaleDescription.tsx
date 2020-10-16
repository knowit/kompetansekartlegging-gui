import clsx from 'clsx';
import React from 'react'
import { CardStyle, ScaleDescStyle } from '../../styles';
import { ScaleDescriptionProps } from '../../types';


export const ScaleDescription = ({...props}: ScaleDescriptionProps) => {
    const style = ScaleDescStyle();
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
                    SCALE DESCRIPTION
                </button>
            </div>
        </div>
    );
};
