import React, { useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import { not, getAttribute } from "./helpers";
import useApiGet from "./useApiGet";
import UsersTable from "./UsersTable";

const AddUserToGroupDialog = ({
    onCancel,
    onConfirm,
    open,
    currentUsersInGroup,
    userGetFn,
    roleName,
    title,
    confirmButtonText,
}: any) => {
    const { result: users, error, loading } = useApiGet({
        getFn: userGetFn,
        refreshCounter: 0,
    });
    const [selectedUser, setSelectedUser] = useState<any>();
    const onSelect = (user: any) => {
        if (user === selectedUser) {
            setSelectedUser(null);
        } else {
            setSelectedUser(user);
        }
    };
    const [nameFilter, setNameFilter] = useState<string>("");

    const nameFilterFn = (user: any) => {
        const name = getAttribute(user, "name");
        return (
            !name ||
            name.toLocaleLowerCase().startsWith(nameFilter.toLocaleLowerCase())
        );
    };
    const usersInList = not(users, currentUsersInGroup).filter(nameFilterFn);

    return (
        <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && users && (
                <>
                    <DialogTitle>
                        <Box component="div" mb={1}>
                            {title || `Legg til ${roleName}`}
                        </Box>
                        <TextField
                            fullWidth
                            placeholder="Søk etter ansatt i Knowit Objectnet"
                            variant="outlined"
                            value={nameFilter}
                            onChange={(e: any) => setNameFilter(e.target.value)}
                        />
                    </DialogTitle>
                    <DialogContent>
                        <UsersTable
                            users={usersInList}
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
                    {confirmButtonText ||
                        `Legg til ${
                            (selectedUser &&
                                getAttribute(selectedUser, "name")) ||
                            " "
                        }`}
                </Button>
                <Button onClick={onCancel} color="primary" variant="contained">
                    Avbryt
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserToGroupDialog;
