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
        border: '3px solid',
        background: '#C3DEC3',
      },
      leaveButton: {
        border: '3px solid #F3C8BA',
        boxsizing: 'border-box',
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
                <DialogTitle id="alert-dialog-title"><ErrorIcon className={style.errorIcon}></ErrorIcon>
<b>Obs! Svarene dine er ikke lagret.</b></DialogTitle>
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
                    <Button onClick={handleStayInForm}  autoFocus className={style.stayButton}> 
                        <div className={style.buttonText}>Bli på skjemaet</div>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
