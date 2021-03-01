import React, { useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import UsersTable from "./UsersTable";

const AddGroupDialog = ({
    onCancel,
    onConfirm,
    open,
    groupLeaders,
    error,
    loading,
}: any) => {
    const [selectedUser, setSelectedUser] = useState<any>();
    const onSelect = (user: any) => {
        if (user === selectedUser) {
            setSelectedUser(null);
        } else {
            setSelectedUser(user);
        }
    };

    return (
        <Dialog open={open} onClose={onCancel} fullWidth maxWidth="md">
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && groupLeaders && (
                <>
                    <DialogTitle>
                        Velg gruppeleder til den nye gruppen
                    </DialogTitle>
                    <DialogContent>
                        <UsersTable
                            users={groupLeaders}
                            selectedUser={selectedUser}
                            setSelectedUser={onSelect}
                        />
                    </DialogContent>
                </>
            )}
            <DialogActions>
                <Button
                    onClick={() => onConfirm(selectedUser)}
                    disabled={!selectedUser}
                >
                    Lag gruppe
                </Button>
                <Button onClick={onCancel} color="primary" variant="contained">
                    Avbryt
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddGroupDialog;
