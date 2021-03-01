import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

import { getAttribute } from "./helpers";

const User = ({ user, selected, setSelectedUser }: any) => {
    const username = user.Username;
    const name = getAttribute(user, "name");
    const email = getAttribute(user, "email");
    const picture = getAttribute(user, "picture");

    return (
        <>
            <TableRow
                hover
                selected={selected}
                onClick={() => setSelectedUser(user)}
            >
                <TableCell>
                    <Avatar alt={name} src={picture} />
                </TableCell>
                <TableCell>
                    {name}
                </TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{username}</TableCell>
            </TableRow>
        </>
    );
};

const UsersTable = ({ users, selectedUser, setSelectedUser }: any) => {
    const isSelected = (user: any) =>
        selectedUser && user.Username === selectedUser.Username;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Navn</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Brukernavn</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((u: any) => (
                        <User
                            key={u.Username}
                            user={u}
                            selected={isSelected(u)}
                            setSelectedUser={setSelectedUser}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;
