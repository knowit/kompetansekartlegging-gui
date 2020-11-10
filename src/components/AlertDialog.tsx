import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AlertDialogProps } from '../types';
import { makeStyles } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { KnowitColors } from '../styles';
import { SignalWifi1BarLockSharp } from '@material-ui/icons';


// style
const alertStyle = makeStyles({
      stayButton: {
        width: '162px',
        height: '38px',
        border: '3px solid',
        background: KnowitColors.lightGreen,
        borderRadius: '19px',
        borderColor: KnowitColors.lightGreen
      },
      leaveButton: {
        width: '162px',
        height: '38px',
        border: '3px solid',
        borderColor: KnowitColors.flamingo,
        boxsizing: 'border-box',
        borderRadius: '19px'

    },
    buttonText: {
        fontWeight: 'bold',
        textTransform: 'none'

    },
    errorIcon: {
        fill: KnowitColors.fuchsia,
        marginTop: '3px'
    },
    alertText: {
        color: 'black'
    },
    alertButtons: {
        justifyContent: 'space-evenly',
    }
});



export const AlertDialog = ({ ...props }: AlertDialogProps) => {
    const style = alertStyle();

    const handleStayInForm = () => {
        props.setAlertDialogOpen(false);
    };

    const handleLeaveForm = () => {
        props.setAlertDialogOpen(false);
        props.changeActiveCategory(props.clickedCategory);
        props.setIsCategorySubmitted(true)
        props.resetAnswers()
    };


    return (
        <div>
            <Dialog
                open={props.alertDialogOpen}
                onClose={handleStayInForm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <ErrorIcon fontSize='large' className={style.errorIcon}></ErrorIcon>
                    <div>Obs! Svarene dine er ikke lagret.</div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={style.alertText}>
                            Hvis du forlater skjemaet nå vil ikke endringene du har gjort bli lagret.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={style.alertButtons}>
                    <Button onClick={handleLeaveForm}
                        className={style.leaveButton}
                        >
                        <div className={style.buttonText}>Forlat skjemaet</div>

                    </Button>
                    <Button onClick={handleStayInForm} autoFocus className={style.stayButton}> 
                        <div className={style.buttonText}>Bli på skjemaet</div>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
