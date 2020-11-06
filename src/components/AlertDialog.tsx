import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AlertDialogProps } from '../types';

export const AlertDialog = ({...props} : AlertDialogProps) => {

  const handleStayInForm = () => {
    props.setAlertDialogOpen(false);
  };

  const handleLeaveForm = () => {
    props.setAlertDialogOpen(false);
    props.changeActiveCategory(props.clickedCategory); 
    props.setIsCategorySubmitted(true)
    props.resetAnswers()
  }


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
            color="primary">
            Forlat skjemaet
          </Button>
          <Button onClick={handleStayInForm} color="primary" autoFocus>
            Bli på skjemaet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
