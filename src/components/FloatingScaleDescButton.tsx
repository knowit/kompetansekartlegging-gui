import React, { Fragment, useEffect, useState } from 'react'
import { AnswerData, TopicScoreWithIcon } from '../types'
import { GetIcon } from '../icons/iconController'
import { Fab, makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import { wrapString } from '../helperFunctions';

const barIconSize = 24;

const highlightsStyle = makeStyles({
    root: {
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
});



export default function FloatingScaleDescButton() {

    const style = highlightsStyle();

    return (
        <Fab variant="extended" className={style.root}>
            Skalabeskrivelse
        </Fab>

    );
};
