import React, { useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { not } from "./helpers";
import useApiGet from "./useApiGet";
import UsersTable from "./UsersTable";

const AddUserToGroupDialog = ({
    onCancel,
    onConfirm,
    open,
    currentUsersInGroup,
    userGetFn,
    roleName,
}: any) => {
    const { result: users, error, loading } = useApiGet({
        getFn: userGetFn,
        refreshCounter: 0,
    });
    const [selectedUser, setSelectedUser] = useState<any>();

    return (
        <Dialog open={open} onClose={onCancel} fullWidth maxWidth="md">
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && users && (
                <>
                    <DialogTitle>Legg til {roleName}</DialogTitle>
                    <DialogContent>
                        <UsersTable
                            users={not(users, currentUsersInGroup)}
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                        />
                    </DialogContent>
                </>
            )}
            <DialogActions>
                <Button
                    onClick={() => onConfirm(selectedUser)}
                    disabled={!selectedUser}
                >
                    Legg til
                </Button>
                <Button onClick={onCancel} color="primary" variant="outlined">
                    Avbryt
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserToGroupDialog;
