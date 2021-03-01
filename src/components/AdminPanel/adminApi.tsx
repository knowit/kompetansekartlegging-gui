import { API, Auth } from "aws-amplify";

export type ApiResponse<T> = {
    result?: T;
    error?: string;
};

const removeUserFromGroup = async (
    groupname: string,
    username: string
): Promise<ApiResponse<any>> => {
    let apiName = "AdminQueries";
    let path = "/removeUserFromGroup";
    let myInit = {
        body: {
            groupname,
            username,
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
        return {
            error: `Could not remove user '${username}' from group '${groupname}'.`,
        };
    }
};

const removeGroupLeader = async (user: any) =>
    await removeUserFromGroup("groupLeader", user.Username);
const removeAdmin = async (user: any) =>
    await removeUserFromGroup("admin", user.Username);

const addUserToGroup = async (
    groupname: string,
    username: string
): Promise<ApiResponse<any>> => {
    let apiName = "AdminQueries";
    let path = "/addUserToGroup";
    let myInit = {
        body: {
            groupname,
            username,
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
        return {
            error: `Could not add user '${username}' to group '${groupname}'.`,
        };
    }
};

const addGroupLeader = async (user: any) =>
    await addUserToGroup("groupLeader", user.Username);
const addAdmin = async (user: any) =>
    await addUserToGroup("admin", user.Username);

const listUsersInGroup = async (
    groupname: string
): Promise<ApiResponse<any[]>> => {
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
        return {
            error: `Could not get a list of users in group '${groupname}'.`,
        };
    }
};

const listGroupLeaders = async () => await listUsersInGroup("groupLeader");
const listAdmins = async () => await listUsersInGroup("admin");

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

export {
    listAllUsers,
    listGroupLeaders,
    addGroupLeader,
    removeGroupLeader,
    listAdmins,
    addAdmin,
    removeAdmin,
};
