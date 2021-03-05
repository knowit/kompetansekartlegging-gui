import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";

import commonStyles from "./common.module.css";
import useApiGet from "./useApiGet";
import {
    listAllUsers,
    listGroupLeaders,
    removeGroupLeader,
    addGroupLeader,
} from "./adminApi";
import { getAttribute } from "./helpers";
import AddUserToGroupDialog from "./AddUserToGroupDialog";
import DeleteUserFromGroupDialog from "./DeleteUserFromGroupDialog";
import Button from "../Button";

const GroupLeader = (props: any) => {
    const { groupLeader, deleteGroupLeader } = props;
    const username = groupLeader.Username;
    const name = getAttribute(groupLeader, "name");
    const email = getAttribute(groupLeader, "email");
    const picture = getAttribute(groupLeader, "picture");

    return (
        <>
            <TableRow>
                <TableCell>
                    <Avatar alt={name} src={picture} />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{username}</TableCell>
                <TableCell>
                    <IconButton
                        edge="end"
                        onClick={() => deleteGroupLeader(groupLeader)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
};

const GroupLeaderTable = ({ groupLeaders, deleteGroupLeader }: any) => {
    return (
        <TableContainer
            component={Paper}
            className={commonStyles.tableContainer}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Navn</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Brukernavn</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groupLeaders.map((gl: any) => (
                        <GroupLeader
                            key={gl.Username}
                            groupLeader={gl}
                            deleteGroupLeader={deleteGroupLeader}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const EditGroupLeaders = () => {
    const [dummy, setDummy] = useState(0); // used to refresh table; don't arrest me
    const { result: groupLeaders, error, loading } = useApiGet({
        getFn: listGroupLeaders,
        refreshCounter: dummy,
    });
    const [showAddGroupLeader, setShowAddGroupLeader] = useState<boolean>(
        false
    );
    const [groupLeaderToDelete, setGroupLeaderToDelete] = useState<any>();

    const [
        showDeleteUserFromGroupDialog,
        setShowDeleteUserFromGroupDialog,
    ] = useState<boolean>(false);
    const deleteGroupLeader = (user: any) => {
        setGroupLeaderToDelete(user);
        setShowDeleteUserFromGroupDialog(true);
    };
    const deleteGroupLeaderConfirm = async () => {
        await removeGroupLeader(groupLeaderToDelete);
        setShowDeleteUserFromGroupDialog(false);
        setDummy((dummy) => dummy + 1);
    };
    const clearSelectedGroupLeader = () => setGroupLeaderToDelete(null);
    const hideShowAddGroupLeader = () => setShowAddGroupLeader(false);
    const addGroupLeaderConfirm = async (user: any) => {
        await addGroupLeader(user);
        setShowAddGroupLeader(false);
        setDummy((dummy) => dummy + 1);
    };

    return (
        <Container maxWidth="md" className={commonStyles.container}>
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && groupLeaders && (
                <>
                    <Card style={{ marginBottom: "24px" }} variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Rediger gruppeledere
                            </Typography>
                            Gruppeledere har tilgang til sine egne gruppebarns
                            svar. De kan også velge sine gruppebarn. På denne
                            siden kan du legge til og fjerne gruppeledere.
                        </CardContent>
                    </Card>
                    <GroupLeaderTable
                        groupLeaders={groupLeaders}
                        deleteGroupLeader={deleteGroupLeader}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PersonAddIcon />}
                        onClick={() => setShowAddGroupLeader(true)}
                    >
                        Legg til gruppeleder
                    </Button>
                </>
            )}
            <DeleteUserFromGroupDialog
                open={showDeleteUserFromGroupDialog}
                onCancel={() => setShowDeleteUserFromGroupDialog(false)}
                onExited={clearSelectedGroupLeader}
                onConfirm={deleteGroupLeaderConfirm}
                user={groupLeaderToDelete}
                roleName="gruppeleder"
            >
                Husk å sette en ny gruppeleder for de gruppene brukeren var
                ansvarlig for.
            </DeleteUserFromGroupDialog>
            {showAddGroupLeader && (
                <AddUserToGroupDialog
                    userGetFn={listAllUsers}
                    roleName="gruppeleder"
                    open={showAddGroupLeader}
                    currentUsersInGroup={groupLeaders}
                    onCancel={hideShowAddGroupLeader}
                    onConfirm={addGroupLeaderConfirm}
                />
            )}
        </Container>
    );
};

export default EditGroupLeaders;
