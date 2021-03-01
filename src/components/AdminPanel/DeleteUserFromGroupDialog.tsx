import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { getAttribute } from "./helpers";

const DeleteUserFromGroupDialog = ({
    onCancel,
    onConfirm,
    user,
    open,
    roleName,
    children,
}: any) => {
    const name = getAttribute(user, "name");
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{`Fjern ${name} fra ${roleName}rollen?`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Er du sikker på at du har lyst å fjerne {name} fra{" "}
                    {roleName}rollen? {children}
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

export default DeleteUserFromGroupDialog;
