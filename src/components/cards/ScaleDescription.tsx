import clsx from 'clsx';
import React from 'react'
import { CardStyle, ScaleDescStyle } from '../../styles';
import { ScaleDescriptionProps } from '../../types';
import CloseIcon from '@material-ui/icons/Close';


export const ScaleDescription = ({...props}: ScaleDescriptionProps) => {
    const style = ScaleDescStyle();
    const cardStyle = CardStyle();

    const buttonClick = () => {
        //TODO: Find a way to replace harcoded int with a something like enum (enum dont work)
        props.commonCardProps.setActiveCard(props.commonCardProps.index,  !props.commonCardProps.active);
    };

    

    return (
        <div className={clsx(style.root, props.commonCardProps.active ? cardStyle.open : cardStyle.closed)}>
            <div className={style.cardHeader}>
                <button 
                    onClick={buttonClick} 
                    className={clsx(cardStyle.cardButton)}
                >
                    SCALE DESCRIPTION 
                </button>
                {props.commonCardProps.active ? (
                        <CloseIcon 
                            fontSize="large" 
                            className={style.closeButton}
                            onClick={buttonClick}    
                        />
                    ) : null}
            </div>
            
        </div>
    );
};
