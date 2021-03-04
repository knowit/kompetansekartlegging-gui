import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
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
import AddUserToGroupDialog from "./AddUserToGroupDialog";
import DeleteUserFromGroupDialog from "./DeleteUserFromGroupDialog";
import useApiGet from "./useApiGet";
import { listAllUsers, listAdmins, removeAdmin, addAdmin } from "./adminApi";
import { getAttribute } from "./helpers";

const Admin = (props: any) => {
    const { admin, deleteAdmin } = props;
    const username = admin.Username;
    const name = getAttribute(admin, "name");
    const email = getAttribute(admin, "email");
    const picture = getAttribute(admin, "picture");

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
                    <IconButton edge="end" onClick={() => deleteAdmin(admin)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
};

const AdminTable = ({ admins, deleteAdmin }: any) => {
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
                    {admins.map((gl: any) => (
                        <Admin
                            key={gl.Username}
                            admin={gl}
                            deleteAdmin={deleteAdmin}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const EditAdmins = () => {
    const [dummy, setDummy] = useState(0);
    const { result: admins, error, loading } = useApiGet({
        getFn: listAdmins,
        refreshCounter: dummy,
    });
    const [showAddAdmin, setShowAddAdmin] = useState<boolean>(false);
    const [
        showDeleteUserFromGroupDialog,
        setShowDeleteUserFromGroupDialog,
    ] = useState<boolean>(false);
    const [adminToDelete, setAdminToDelete] = useState<any>();

    const deleteAdmin = (user: any) => {
        setShowDeleteUserFromGroupDialog(true);
        setAdminToDelete(user);
    };
    const deleteAdminConfirm = async () => {
        await removeAdmin(adminToDelete);
        setShowDeleteUserFromGroupDialog(false);
        setDummy((dummy) => dummy + 1);
    };
    const clearSelectedAdmin = () => setAdminToDelete(null);
    const hideShowAddAdmin = () => setShowAddAdmin(false);
    const addAdminConfirm = async (user: any) => {
        await addAdmin(user);
        setShowAddAdmin(false);
        setDummy((dummy) => dummy + 1);
    };

    return (
        <Container maxWidth="md" style={{ marginLeft: "0" }}>
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && admins && (
                <>
                    <Card style={{ marginBottom: "24px" }} variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Rediger administratorer
                            </Typography>
                            Administratorer har tilgang til alles svar. De kan
                            også velge hvem som er gruppeledere og
                            administratorer og kan lage og fjerne grupper. På
                            denne siden kan du legge til og fjerne gruppeledere.
                        </CardContent>
                    </Card>
                    <AdminTable admins={admins} deleteAdmin={deleteAdmin} />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PersonAddIcon />}
                        style={{ marginTop: "24px" }}
                        onClick={() => setShowAddAdmin(true)}
                    >
                        Legg til administrator
                    </Button>
                </>
            )}
            <DeleteUserFromGroupDialog
                open={showDeleteUserFromGroupDialog}
                onCancel={() => setShowDeleteUserFromGroupDialog(false)}
                onExited={clearSelectedAdmin}
                onConfirm={deleteAdminConfirm}
                user={adminToDelete}
                roleName="administrator"
            />
            {showAddAdmin && (
                <AddUserToGroupDialog
                    open={showAddAdmin}
                    currentUsersInGroup={admins}
                    userGetFn={listAllUsers}
                    onCancel={hideShowAddAdmin}
                    onConfirm={addAdminConfirm}
                    roleName="administrator"
                />
            )}
        </Container>
    );
};

export default EditAdmins;
