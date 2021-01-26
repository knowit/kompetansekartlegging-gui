import React, { Fragment, useEffect, useState } from 'react'
import { HighlightsProps, ProgressProps, TopicScoreWithIcon } from '../types'
import { GetIcon } from '../icons/iconController'
import { Box, makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import { wrapString } from '../helperFunctions';
import clsx from 'clsx';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';

const barIconSize = 24;
const barIconSizeMobile = 20;
const maxTopicStringLength = 20;

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    percentage: {
        fontFamily: 'Arial',
        fontSize: '10px'
    },
    bar: {
        width: '100%'
    }
});

export default function ProgressBar({...props }: ProgressProps) {

    const classes = useStyles();

    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        updateProgress();
    }, []);

    const updateProgress = () => {
        let unfilledQuestions = props.alerts?.qidMap.size ?? 0;
        let filledQuestions = props.totalQuestions - unfilledQuestions;
        let progressPercentage = filledQuestions / props.totalQuestions * 100;
        setProgress(50);
    };

    const LinearProgressWithPercentage = (props: LinearProgressProps & { value: number }) => {
        return (
            <div className={classes.root}>
                <div className={classes.percentage}>
                    {`${Math.round(progress)}%`}
                </div>
                <div className={classes.bar}>
                    <LinearProgress
                        variant="determinate"
                        {...props} />
                </div>
            </div>
        );
    }

    return (
        <LinearProgressWithPercentage value={progress}/>
    );
};
