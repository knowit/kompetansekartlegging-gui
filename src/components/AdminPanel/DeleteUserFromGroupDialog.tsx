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
    onExited,
    user,
    open,
    roleName,
    disableRoleSuffix,
    children,
}: any) => {
    const name = getAttribute(user, "name");
    const role = disableRoleSuffix ? roleName : `${roleName}rollen`;
    return (
        <Dialog open={open} onClose={onCancel} onExited={onExited}>
            <DialogTitle>{`Fjern ${name} fra ${role}?`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Er du sikker på at du har lyst å fjerne {name} fra {role}?{" "}
                    {children}
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
