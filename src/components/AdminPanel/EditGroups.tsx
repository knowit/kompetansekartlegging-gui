import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
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
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import commonStyles from "./common.module.css";
import DeleteUserFromGroupDialog from "./DeleteUserFromGroupDialog";
import AddGroupDialog from "./AddGroupDialog";
import DeleteGroupDialog from "./DeleteGroupDialog";
import useApiGet from "./useApiGet";
import {
    listAllUsers as listAllAvailableUsers,
    listGroupLeaders,
} from "./adminApi";
import {
    listAllGroups,
    removeGroup,
    addGroup,
    listAllUsers,
    addUserToGroup,
    updateUserGroup,
    removeUserFromGroup,
} from "./groupsApi";
import { getAttribute, compareByName } from "./helpers";
import GroupMembers from "./GroupMembers";

const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
});

const Group = ({
    addMembersToGroup,
    deleteMember,
    group,
    deleteGroup,
    users,
    open,
    setOpenId,
}: any) => {
    const name = getAttribute(group.groupLeader, "name");
    const picture = getAttribute(group.groupLeader, "picture");
    const classes = useRowStyles();

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => setOpenId(group.id)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell align="right">
                    <Avatar alt={name} src={picture} />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{group.members.length}</TableCell>
                <TableCell align="right">
                    <Button
                        endIcon={<DeleteIcon />}
                        onClick={() => deleteGroup(group)}
                    >
                        Fjern gruppe
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={5}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom>
                                Medlemmer
                            </Typography>
                            <GroupMembers
                                allUsers={users}
                                members={group.members}
                                addMembersToGroup={(users: any) =>
                                    addMembersToGroup(users, group.id)
                                }
                                deleteMember={(user: any) =>
                                    deleteMember(user, group.id)
                                }
                            />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const GroupsTable = ({
    groups,
    users,
    allAvailableUsers,
    groupLeaders,
    deleteGroup,
    addMembersToGroup,
    deleteMember,
}: any) => {
    const [openId, setOpenId] = useState<string>("");
    const setOpenGroup = (groupId: string) => {
        if (openId === groupId) {
            setOpenId("");
        } else {
            setOpenId(groupId);
        }
    };

    const allAvailableUsersAnnotated = allAvailableUsers.map((u: any) => {
        const user = users.find((us: any) => us.id === u.Username);
        if (user) {
            const groupId = user.groupID;
            const group = groups.find((g: any) => g.id === groupId);
            const groupLeaderUsername = group?.groupLeaderUsername;
            const groupLeader = groupLeaders?.find(
                (gl: any) => gl.Username === groupLeaderUsername
            );
            return { ...u, groupId, groupLeader };
        } else {
            return u;
        }
    });

    const groupsAnnotated = groups
        .map((g: any) => {
            const groupLeader = groupLeaders.find(
                (gl: any) => gl.Username === g.groupLeaderUsername
            );
            const members = allAvailableUsersAnnotated.filter(
                (u: any) => u.groupId === g.id
            );
            return { ...g, groupLeader, members };
        })
        .sort((g1: any, g2: any) =>
            compareByName(g1?.groupLeader, g2?.groupLeader)
        );

    return (
        <TableContainer
            component={Paper}
            className={commonStyles.tableContainer}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Detaljer</TableCell>
                        <TableCell />
                        <TableCell>Gruppeleder</TableCell>
                        <TableCell>Antall gruppemedlemmer</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groupsAnnotated.map((g: any) => (
                        <Group
                            key={g.id}
                            group={g}
                            users={allAvailableUsersAnnotated}
                            deleteGroup={deleteGroup}
                            open={g.id === openId}
                            setOpenId={setOpenGroup}
                            addMembersToGroup={addMembersToGroup}
                            deleteMember={deleteMember}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const EditGroups = () => {
    const [dummy, setDummy] = useState(0);
    const { result: users, error, loading } = useApiGet({
        getFn: listAllUsers,
        refreshCounter: dummy,
    });
    const {
        result: allAvailableUsers,
        error: allAvailableUsersError,
        loading: allAvailableUsersLoading,
    } = useApiGet({
        getFn: listAllAvailableUsers,
        refreshCounter: dummy,
    });
    const {
        result: groupLeaders,
        error: groupLeadersError,
        loading: groupLeadersLoading,
    } = useApiGet({
        getFn: listGroupLeaders,
        refreshCounter: dummy,
    });
    const {
        result: groups,
        error: groupsError,
        loading: groupsLoading,
    } = useApiGet({
        getFn: listAllGroups,
        refreshCounter: dummy,
    });
    const [showAddGroup, setShowAddGroup] = useState<boolean>(false);
    const [groupToDelete, setGroupToDelete] = useState<any>();
    const [memberToDelete, setMemberToDelete] = useState<any>();

    const deleteMember = (user: any, group: any) =>
        setMemberToDelete({ user, group });
    const deleteMemberConfirm = async () => {
        await removeUserFromGroup(
            memberToDelete.user.Username,
            memberToDelete.group.id
        );
        setMemberToDelete(null);
        setDummy((dummy) => dummy + 1);
    };
    const deleteGroup = (group: any) => setGroupToDelete(group);
    const deleteGroupConfirm = async () => {
        await removeGroup(groupToDelete);
        await Promise.all(
            users
                .filter((u: any) => u.groupID === groupToDelete.id)
                .map((u: any) => removeUserFromGroup(u.id, groupToDelete.id))
        );
        setGroupToDelete(null);
        setDummy((dummy) => dummy + 1);
    };
    const clearSelectedGroup = () => setGroupToDelete(null);
    const hideShowAddGroup = () => setShowAddGroup(false);
    const addGroupConfirm = async (user: any) => {
        await addGroup(user);
        setShowAddGroup(false);
        setDummy((dummy) => dummy + 1);
    };

    const addMembersToGroup = async (selectedUsers: any[], groupId: string) => {
        await Promise.all(
            selectedUsers.map((u: any) => {
                const userHasGroup = users.some(
                    (us: any) => us.id === u.Username
                );
                if (userHasGroup) {
                    return updateUserGroup(u.Username, groupId);
                } else {
                    return addUserToGroup(u.Username, groupId);
                }
            })
        );
        setDummy((dummy) => dummy + 1);
    };

    const isLoading =
        loading ||
        allAvailableUsersLoading ||
        groupLeadersLoading ||
        groupsLoading;
    const isError =
        error || allAvailableUsersError || groupLeadersError || groupsError;

    return (
        <Container maxWidth="md" style={{ marginLeft: "0" }}>
            {isError && <p>An error occured: {isError}</p>}
            {isLoading && <CircularProgress />}
            {!isError && !isLoading && groups && (
                <>
                    <Card style={{ marginBottom: "24px" }} variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Rediger grupper
                            </Typography>
                            En gruppe består av en gruppeleder og flere
                            gruppebarn. På denne siden kan du lage nye grupper,
                            slette grupper, endre gruppelederen til en gruppe og
                            legge til og fjerne ansatte til og fra grupper.
                        </CardContent>
                    </Card>
                    <GroupsTable
                        groups={groups}
                        deleteGroup={deleteGroup}
                        users={users}
                        allAvailableUsers={allAvailableUsers}
                        groupLeaders={groupLeaders}
                        addMembersToGroup={addMembersToGroup}
                        deleteMember={deleteMember}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        style={{ marginTop: "48px" }}
                        onClick={() => setShowAddGroup(true)}
                    >
                        Lag ny gruppe
                    </Button>
                </>
            )}
            <DeleteGroupDialog
                open={!!groupToDelete}
                onCancel={clearSelectedGroup}
                onConfirm={deleteGroupConfirm}
                group={groupToDelete}
                groupLeaders={groupLeaders}
            />
            <DeleteUserFromGroupDialog
                open={!!memberToDelete}
                onCancel={() => setMemberToDelete(null)}
                onConfirm={deleteMemberConfirm}
                user={memberToDelete && memberToDelete.user}
                roleName="gruppen"
                disableRoleSuffix
            />
            {showAddGroup && (
                <AddGroupDialog
                    open={showAddGroup}
                    groupLeaders={groupLeaders}
                    error={groupLeadersError}
                    loading={groupLeadersLoading}
                    onCancel={hideShowAddGroup}
                    onConfirm={addGroupConfirm}
                />
            )}
        </Container>
    );
};

export default EditGroups;
