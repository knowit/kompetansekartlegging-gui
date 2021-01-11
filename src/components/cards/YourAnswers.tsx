import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { KnowitColors } from '../../styles';
import { YourAnswerProps } from '../../types';
import { YourAnswersMobile } from '../YourAnswersMobile';
import { YourAnswersDesktop } from '../YourAnswersDesktop';
import { Panel } from '../Content';


export const YourAnswers = ({ ...props }: YourAnswerProps) => {
    return (
        props.isMobile ? 
            <YourAnswersMobile
                {...props}
                setIsCategorySubmitted={props.setIsCategorySubmitted}
                alerts={props.alerts}
            />
        :
            <YourAnswersDesktop 
                {...props}
                setIsCategorySubmitted={props.setIsCategorySubmitted}
                alerts={props.alerts}
            />
    );
};
