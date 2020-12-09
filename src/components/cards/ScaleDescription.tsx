import clsx from 'clsx';
import React from 'react';
import { KnowitColors, ScaleDescStyle } from '../../styles';
import { ScaleDescriptionProps } from '../../types';
import CloseIcon from '@material-ui/icons/Close';
import DescriptionTable from '../DescriptionTable';
import { makeStyles } from '@material-ui/core';

const cardCornerRadius: number = 40;
const zIndex: number = 40;

const scaleDescriptionStyle = makeStyles({
    root: {
        maxHeight: '32%',
        width: "100%",
        backgroundColor: KnowitColors.ecaluptus
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
})


export const ScaleDescription = ({...props}: ScaleDescriptionProps) => {
    const style = scaleDescriptionStyle();

    const buttonClick = () => {
        //TODO: Find a way to replace harcoded int with a something like enum (enum dont work)
        props.commonCardProps.setActiveCard(props.commonCardProps.index,  !props.commonCardProps.active);
    };


    return (
        props.isMobile ? props.isScaleDescriptionOpen ? <div>ScaleDesc</div> : null
        :
        <div className={clsx(style.root, props.commonCardProps.active ? style.open : style.closed)}>
            <div className={style.cardHeader}>
                <button 
                    onClick={buttonClick} 
                    className={clsx(style.cardButton)}
                >
                    SKALABESKRIVELSE 
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
                <DescriptionTable/>
            : ""}
            
        </div>
    );
};
