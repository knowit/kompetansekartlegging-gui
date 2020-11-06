import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AlertDialogProps } from '../types';
import { makeStyles } from '@material-ui/core';


// style
const alertStyle = makeStyles({
      stayButton: {
        border: '3px solid',
        background: '#C3DEC3',
        borderradius: '19px',
      },
      leaveButton: {

        border: '3px solid #F3C8BA',
        boxsizing: 'border-box',
        borderradius: '19px',
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
                <DialogTitle id="alert-dialog-title">{"Obs! Svarene dine er ikke lagret."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                            Hvis du forlater skjemaet nå vil ikke endringene du har gjort bli lagret.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLeaveForm}
                        className={style.leaveButton}
                        color="primary">
                        Forlat skjemaet
                    </Button>
                    <Button onClick={handleStayInForm} color="primary" autoFocus className={style.stayButton}> 
                        Bli på skjemaet
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
