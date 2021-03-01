import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const DeleteGroupDialog = ({
    onCancel,
    onConfirm,
    group,
    groupLeaders,
    open,
}: any) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{`Fjern gruppe?`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Er du sikker på at du har lyst å fjerne gruppen?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm}>Fjern</Button>
                <Button onClick={onCancel} color="primary" variant="contained">
                    Avbryt
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteGroupDialog;
