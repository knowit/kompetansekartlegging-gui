import { makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import RefreshRoundedIcon from '@material-ui/icons/Refresh';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        fontSize: 'inherit',
        marginLeft: 10
    },
    alertBulb: {
        position: 'absolute',
        width: '1em',
        height: '1em',
        borderRadius: '50%',
        fill: KnowitColors.fuchsia,
        backgroundColor: KnowitColors.darkBrown
    },
    alertBulbMultiple: {
        width: '2em',
        height: 'inherit',
        borderStyle: 'solid',
        borderRadius: '1em',
        borderWidth: 2,
        backgroundColor: KnowitColors.fuchsia,
        color: KnowitColors.darkBrown,
        borderColor: KnowitColors.darkBrown,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'center'
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
                        <ErrorRoundedIcon aria-label={props.message} className={classes.alertBulb}/>
                    </Tooltip>
                </div>
            );
        case AlertType.Outdated:
            return (
                <div className={classes.root}>
                    <Tooltip title={props.message}>
                        <RefreshRoundedIcon aria-label={props.message} className={classes.alertBulb}/>
                    </Tooltip>
                </div>
            );
        case AlertType.Multiple:
            return (
                <Tooltip title={props.message}>
                    <div aria-label={props.message} className={classes.alertBulbMultiple}>
                        {props.size}
                    </div>
                </Tooltip>
            );
    }
}
