import React, { Fragment, useEffect, useState } from 'react'
import { AnswerData, TopicScoreWithIcon } from '../types'
import { GetIcon } from '../icons/iconController'
import { Fab, makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import { wrapString } from '../helperFunctions';
import DescriptionTableMobile from './DescriptionTableMobile';

const barIconSize = 24;

const highlightsStyle = makeStyles({
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
        width: '400px',
        maxHeight: '100%',
        maxWidth: '100%'

    }
});



export default function FloatingScaleDescButton() {

    const style = highlightsStyle();

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
