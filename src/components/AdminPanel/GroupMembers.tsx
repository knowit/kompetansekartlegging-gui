import React, { useState } from "react";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";

import { getAttribute } from "./helpers";
import PictureAndNameCell from "./PictureAndNameCell";
import AddMemberToGroupDialog from "./AddMemberToGroupDialog";
import Button from "../mui/Button";
import Table from "../mui/Table";
import TableRow from "../mui/TableRow";

const User = ({ user, deleteMember }: any) => {
    const name = getAttribute(user, "name");
    const email = getAttribute(user, "email");
    const picture = getAttribute(user, "picture");

    return (
        <>
            <TableRow>
                <TableCell>
                    <PictureAndNameCell name={name} picture={picture} />
                </TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>
                    <Button
                        onClick={() => deleteMember(user)}
                        style={{ fontStyle: "italic" }}
                    >
                        Fjern fra gruppe
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
};

const GroupMembers = ({
    allUsers,
    members,
    addMembersToGroup,
    deleteMember,
}: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const onConfirm = (users: any[]) => {
        addMembersToGroup(users);
        setOpen(false);
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ansatt</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((u: any) => (
                            <User
                                key={u.Username}
                                user={u}
                                deleteMember={deleteMember}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
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
