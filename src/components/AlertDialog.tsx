import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const AlertDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose} color="primary">
            Forlat skjemaet
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Bli på skjemaet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
