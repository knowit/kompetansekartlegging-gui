import React, { Fragment, useEffect, useState } from 'react'
import { AnswerData, TopicScoreWithIcon } from '../types'
import { GetIcon } from '../icons/iconController'
import { Fab, makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import { wrapString } from '../helperFunctions';
import DescriptionTableMobile from './DescriptionTableMobile';

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
        borderRadius: '50px 50px 0px 50px',
        backgroundColor: KnowitColors.beige,

        width: '400px',
    }
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
        borderRadius: '50px 50px 0px 0px',
        backgroundColor: KnowitColors.beige,
        boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.25)'
    }
});




type FloatingScaleDescButtonProps = {
    isMobile: boolean
}


const FloatingScaleDescButton = ({ isMobile } : FloatingScaleDescButtonProps) => {

    const style = isMobile ? floatingScaleDescButtonStyleMobile() : floatingScaleDescButtonStyleDesktop();

    const [scaleDescOpen, setScaleDescOpen] = useState(false)

    const handleClick = () => setScaleDescOpen(!scaleDescOpen);

    return (
        <>  
            {
                scaleDescOpen ? 
                    <div className={style.fabMenu}>
                        <DescriptionTableMobile />
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