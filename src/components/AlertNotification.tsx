import { makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import Tooltip from '@material-ui/core/Tooltip';
import UpdateIcon from '@material-ui/icons/Update';
import RefreshIcon from '@material-ui/icons/Refresh';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import clsx from 'clsx';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        marginLeft: 10
    },
    alertBulb: {
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: KnowitColors.burgunder,
        color: KnowitColors.white,
        fontWeight: 'bold',
        fontSize: 11,
        fontFamily: 'Arial'
    },
    bulbPositionAbsolute: {
        position: 'absolute'
    },
    sizeAnswers: {
        height: 24,
        width: 24,
    },
    sizeMenu: {
        height: 24,
        width: 24,
    }
});

export enum AlertType {
    Incomplete,
    Outdated,
    Multiple
}

export const AlertNotification = (props: { type: AlertType, message: string, size?: number}) => {

    const classes = useStyles();

    switch (props.type) {
        case AlertType.Incomplete:
            return (
                <div className={classes.root}>
                    <Tooltip title={props.message}>
                        <div aria-label={props.message} className={clsx(classes.alertBulb, classes.bulbPositionAbsolute, classes.sizeAnswers)}>!</div>
                    </Tooltip>
                </div>
            );
        case AlertType.Outdated:
            return (
                <div className={classes.root}>
                    <Tooltip title={props.message}>
                        <RefreshIcon aria-label={props.message} className={clsx(classes.alertBulb, classes.bulbPositionAbsolute, classes.sizeAnswers)}/>
                    </Tooltip>
                </div>
            );
        case AlertType.Multiple:
            return (
                <div className={classes.root}>
                    <Tooltip title={props.message}>
                        <div aria-label={props.message} className={clsx(classes.alertBulb, classes.sizeMenu)}>
                            {props.size}
                        </div>
                    </Tooltip>
                </div>
            );
    }
}
