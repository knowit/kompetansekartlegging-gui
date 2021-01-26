import React, { Fragment, useEffect, useState } from 'react'
import { HighlightsProps, ProgressProps, TopicScoreWithIcon } from '../types'
import { GetIcon } from '../icons/iconController'
import { Box, createStyles, makeStyles, Theme, withStyles } from '@material-ui/core';
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
        position: 'relative',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        backgroundColor: 'white',
        padding: 10,
        zIndex: 1
    },
    percentage: {
        fontFamily: 'Arial',
        fontSize: '10px',
        fontWeight: 'bold',
        width: '5%'
    },
    bar: {
        width: '80%'
    }
});

const ThemedLinearProgress = withStyles(() =>
  createStyles({
    root: {
      height: 6,
      borderRadius: 3,
    },
    colorPrimary: {
      backgroundColor: KnowitColors.beige,
    },
    bar: {
      borderRadius: 3,
      backgroundColor: KnowitColors.darkBrown
    },
  }),
)(LinearProgress);

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
                    <ThemedLinearProgress
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
