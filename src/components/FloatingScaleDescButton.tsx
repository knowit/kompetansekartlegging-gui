import React, { Fragment, useEffect, useState } from 'react'
import { AnswerData, TopicScoreWithIcon } from '../types'
import { GetIcon } from '../icons/iconController'
import { Fab, makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import { wrapString } from '../helperFunctions';
import DescriptionTableMobile from './DescriptionTableMobile';
import CloseIcon from '@material-ui/icons/Close';

const floatingScaleDescButtonStyleDesktop = makeStyles({
    fab: {
        alignSelf: 'flex-end',
        width: 'fit-content',
        marginRight: '20px',
        marginBottom: '20px',
        backgroundColor: KnowitColors.beige,
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '11px',
        lineHeight: '13px',
        height: '35px'
    },
    fabMenu: {
        position: 'absolute',
        alignSelf: 'flex-end',
        marginRight: '60px',
        marginBottom: '10px',
        bottom: '55px',
        right: '0px',
        borderRadius: '50px 50px 50px 50px',
        backgroundColor: KnowitColors.beige,
        width: '400px',
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
    },
    closeButton: {
        marginTop: "10px",
        marginRight: "15px",
        '&:hover': {
            color: KnowitColors.darkGreen
        },
        float: 'right',
        position: 'absolute',
        right: '0px',
        top: '0px',
    },
});

const floatingScaleDescButtonStyleMobile = makeStyles({
    fab: {
        alignSelf: 'flex-end',
        width: 'fit-content',
        marginRight: '20px',
        marginBottom: '20px',
        backgroundColor: KnowitColors.beige,
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '11px',
        lineHeight: '13px',
        height: '35px'
    },
    fabMenu: {
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        width: '100%',
        height: '100%',
        zIndex: 101,
        // borderRadius: '50px 50px 0px 0px',
        backgroundColor: KnowitColors.beige,
        // boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.25)'
    },
    closeButton: {
        marginTop: "10px",
        marginRight: "15px",
        '&:hover': {
            color: KnowitColors.darkGreen
        },
        float: 'right',
        position: 'absolute',
        right: '0px',
        top: '0px',
    },
});




type FloatingScaleDescButtonProps = {
    isMobile: boolean
}


const FloatingScaleDescButton = ({ isMobile } : FloatingScaleDescButtonProps) => {

    const style = isMobile ? floatingScaleDescButtonStyleMobile() : floatingScaleDescButtonStyleDesktop();

    const [scaleDescOpen, setScaleDescOpen] = useState(false)

    const handleClick = () => setScaleDescOpen(!scaleDescOpen);
    
    const handleClose = () => setScaleDescOpen(false)

    return (
        <>  
            {
                scaleDescOpen ? 
                    <div className={style.fabMenu}>
                        <CloseIcon 
                            fontSize="large" 
                            className={style.closeButton}
                            onClick={handleClose}    
                        />
                        <DescriptionTableMobile/>
                    </div>
                :
                    null
            }
            <Fab variant="extended" className={style.fab} onClick={handleClick}>
                Skalabeskrivelse
            </Fab>
        </>
    );
};

export default FloatingScaleDescButton