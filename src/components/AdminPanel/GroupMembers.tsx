import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

import { getAttribute } from "./helpers";
import AddMemberToGroupDialog from "./AddMemberToGroupDialog";

const User = ({ user }: any) => {
    const username = user.Username;
    const name = getAttribute(user, "name");
    const email = getAttribute(user, "email");
    const picture = getAttribute(user, "picture");

    return (
        <>
            <TableRow>
                <TableCell>
                    <Avatar alt={name} src={picture} />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{username}</TableCell>
            </TableRow>
        </>
    );
};

const GroupMembers = ({ allUsers, members, addMembersToGroup }: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const onConfirm = (users: any[]) => {
        addMembersToGroup(users)
        setOpen(false);
    };

    return (
        <>
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
                        {members.map((u: any) => (
                            <User key={u.Username} user={u} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
                style={{ margin: "24px 0" }}
                onClick={() => setOpen(true)}
            >
                Legg til medlemmer
            </Button>
            <AddMemberToGroupDialog
                open={open}
                onCancel={() => setOpen(false)}
                allUsers={allUsers}
                members={members}
                onConfirm={onConfirm}
            />
        </>
    );
};

export default GroupMembers;
