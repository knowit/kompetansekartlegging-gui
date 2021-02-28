import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";

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
import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type ApiResponse<T> = {
    result?: T;
    error?: string;
};

const removeUserFromGroup = async(groupname:string, username: string):Promise<ApiResponse<any>> => {
    let apiName = "AdminQueries";
    let path = "/removeUserFromGroup";
    let myInit = {
        body: {
            groupname,
            username
        },
        headers: {
            "Content-Type": "application/json",
            Authorization: `${(await Auth.currentSession())
                .getAccessToken()
                .getJwtToken()}`,
        },
    };

    try {
        await API.post(apiName, path, myInit);
        return { result: `Removed '${username}' from '${groupname}'.` };
    } catch (e) {
        return { error: `Could not remove user '${username}' from group '${groupname}'.` };
    }
}

const removeGroupLeader = async (user:any) => await removeUserFromGroup("groupLeader", user.Username)

const addUserToGroup = async(groupname:string, username: string):Promise<ApiResponse<any>> => {
    let apiName = "AdminQueries";
    let path = "/addUserToGroup";
    let myInit = {
        body: {
            groupname,
            username
        },
        headers: {
            "Content-Type": "application/json",
            Authorization: `${(await Auth.currentSession())
                .getAccessToken()
                .getJwtToken()}`,
        },
    };

    try {
        await API.post(apiName, path, myInit);
        return { result: `Added '${username}' to '${groupname}'.` };
    } catch (e) {
        return { error: `Could not add user '${username}' to group '${groupname}'.` };
    }
}

const addGroupLeader = async (user:any) => await addUserToGroup("groupLeader", user.Username)

const listUsersInGroup = async(groupname:string) : Promise<ApiResponse<any[]>> => {
    let apiName = "AdminQueries";
    let path = "/listUsersInGroup";
    let myInit = {
        queryStringParameters: {
            groupname,
        },
        headers: {
            "Content-Type": "application/json",
            Authorization: `${(await Auth.currentSession())
                .getAccessToken()
                .getJwtToken()}`,
        },
    };

    try {
        const { Users } = await API.get(apiName, path, myInit);
        return { result: Users };
    } catch (e) {
        return { error: `Could not get a list of users in group '${groupname}'.` };
    }
}

const listGroupLeaders = async () => await listUsersInGroup("groupLeader")

const listAllUsers = async (
    limit: number = 60
): Promise<ApiResponse<any[]>> => {
    let nextToken: string = "";
    let allUsers: any[] = [];
    try {
        do {
            let apiName = "AdminQueries";
            let path = "/listUsers";
            let variables = {
                queryStringParameters: {
                    limit: `${limit}`,
                    token: nextToken,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${(await Auth.currentSession())
                        .getAccessToken()
                        .getJwtToken()}`,
                },
            };
            const res = await API.get(apiName, path, variables);
            const { Users, NextToken } = res;
            nextToken = NextToken;
            allUsers = [...allUsers, ...Users];
        } while (!!nextToken);
    } catch (e) {
        return { error: "Could not get a list of all users." };
    }
    return { result: allUsers };
};

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
                <TableCell component="th" scope="row">
                    {name}
                </TableCell>
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
}


type GroupLeaderTableProps = {
    groupLeaders: any[];
    deleteGroupLeader: (user: any) => void;
};

const getAttribute = (user: any, attribute: string): string | undefined =>
    user?.Attributes?.find((attr: any) => attr.Name === attribute)?.Value;

const GroupLeaderTable = ({
    groupLeaders,
    deleteGroupLeader,
}: GroupLeaderTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table>
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
                    {groupLeaders.map((gl) => (
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

const DeleteDialog = ({ onCancel, onConfirm, groupLeader, open }: any) => {
    const name = getAttribute(groupLeader, "name");
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{`Fjern ${name} fra grupplederrollen?`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Er du sikker på at du har lyst å fjerne {name} fra
                    grupplederrollen? Husk å sette en ny gruppeleder for de
                    gruppene brukeren var ansvarlig for.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm}>Fjern</Button>
                <Button onClick={onCancel} color="primary" variant="outlined">
                    Avbryt
                </Button>
            </DialogActions>
        </Dialog>
    );
};

function User({ user, selected, setSelectedUser }: any) {
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
                <TableCell component="th" scope="row">
                    {name}
                </TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{username}</TableCell>
            </TableRow>
        </>
    );
}

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
                        <TableCell />
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

const not = (a: any, b: any) =>
    a.filter((av: any) => !b.some((bv: any) => bv.Username === av.Username));

const compareByName = (a: any, b: any) => {
    const aName = getAttribute(a, "name");
    const bName = getAttribute(b, "name");
    if (!aName) return 1;
    if (!bName) return -1;
    return aName.localeCompare(bName);
};

const AddGroupLeaderDialog = ({
    onCancel,
    onConfirm,
    open,
    currentGroupLeaders,
}: any) => {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const f = async () => {
            setLoading(true);
            const users = await listAllUsers();
            if (users.result) {
                setUsers(users.result.sort(compareByName));
            } else {
                setError(users.error);
            }
            setLoading(false);
        };
        f();
    }, []);

    return (
        <Dialog open={open} onClose={onCancel} fullWidth maxWidth="md">
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && users && (
                <>
                    <DialogTitle>Legg til gruppeleder</DialogTitle>
                    <DialogContent>
                        <UsersTable
                            users={not(users, currentGroupLeaders)}
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

const EditGroupLeaders = () => {
    const [dummy, setDummy] = useState(0) // used to refresh table; don't arrest me
    const [groupLeaders, setGroupLeaders] = useState<any[]>([]);
    const [showAddGroupLeader, setShowAddGroupLeader] = useState<boolean>(
        false
    );
    const [groupLeaderToDelete, setGroupLeaderToDelete] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const f = async () => {
            setLoading(true);
            const users = await listGroupLeaders();
            if (users.result) {
                setGroupLeaders(users.result);
            } else {
                setError(users.error);
            }
            setLoading(false);
        };
        f();
    }, [dummy]);

    const deleteGroupLeader = (user: any) => setGroupLeaderToDelete(user);
    const deleteGroupLeaderConfirm = async () => {
        await removeGroupLeader(groupLeaderToDelete)
        setGroupLeaderToDelete(null);
        setDummy(dummy => dummy + 1)
    };
    const clearSelectedGroupLeader = () => setGroupLeaderToDelete(null);
    const hideShowAddGroupLeader = () => setShowAddGroupLeader(false);
    const addGroupLeaderConfirm = async (user: any) => {
        await addGroupLeader(user)
        setShowAddGroupLeader(false);
        setDummy(dummy => dummy + 1)
    };

    return (
        <Container maxWidth="md" style={{ marginLeft: "0" }}>
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
                        startIcon={<DeleteIcon />}
                        style={{ marginTop: "24px" }}
                        onClick={() => setShowAddGroupLeader(true)}
                    >
                        Legg til gruppeleder
                    </Button>
                </>
            )}
            <DeleteDialog
                open={!!groupLeaderToDelete}
                onCancel={clearSelectedGroupLeader}
                onConfirm={deleteGroupLeaderConfirm}
                groupLeader={groupLeaderToDelete}
            />
            {showAddGroupLeader && (
                <AddGroupLeaderDialog
                    open={showAddGroupLeader}
                    currentGroupLeaders={groupLeaders}
                    onCancel={hideShowAddGroupLeader}
                    onConfirm={addGroupLeaderConfirm}
                />
            )}
        </Container>
    );
};

export { EditGroupLeaders };
