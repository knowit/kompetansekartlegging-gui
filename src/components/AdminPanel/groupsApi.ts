import { v4 as uuidv4 } from "uuid";

import { callGraphQL } from "../../helperFunctions";
import {
    User,
    UsersByGroupQuery,
    Group,
    ListGroupsQuery,
    CreateGroupMutation,
    DeleteGroupMutation,
    UpdateGroupMutation,
    ListUsersQuery,
    CreateUserMutation,
    DeleteUserMutation,
    UpdateUserMutation,
} from "../../API";
import { usersByGroup, listGroups, listUsers } from "../../graphql/queries";
import {
    createGroup,
    deleteGroup,
    updateGroup,
    createUser,
    deleteUser,
    updateUser,
} from "../../graphql/mutations";
import { ApiResponse } from "./adminApi";

const getGroupMembers = async (
    groupID: string
): Promise<ApiResponse<User[]>> => {
    try {
        const usersGQ = await callGraphQL<UsersByGroupQuery>(usersByGroup, {
            input: {
                groupID,
            },
        });
        const users = usersGQ?.data?.usersByGroup?.items?.map(
            (user) =>
                ({
                    id: user?.id,
                    groupID: user?.groupID,
                } as User)
        );

        return { result: users || [] };
    } catch (e) {
        return {
            error: `Could not get members of group with ID '${groupID}'.`,
        };
    }
};

const listAllGroups = async (): Promise<ApiResponse<Group[]>> => {
    try {
        const groupsGQ = await callGraphQL<ListGroupsQuery>(listGroups);
        const groups = groupsGQ?.data?.listGroups?.items?.map(
            (group) =>
                ({
                    id: group?.id,
                    groupLeaderUsername: group?.groupLeaderUsername,
                } as Group)
        );

        return { result: groups || [] };
    } catch (e) {
        return { error: `Could not get a list of all groups.` };
    }
};

const listAllUsers = async (): Promise<ApiResponse<User[]>> => {
    let nextToken: string = "";
    let allUsers: any[] = [];
    try {
        do {
            const usersGQ = await callGraphQL<ListUsersQuery>(listUsers);
            nextToken = usersGQ?.data?.listUsers?.nextToken || "";
            const users = usersGQ?.data?.listUsers?.items?.map(
                (user) =>
                    ({
                        id: user?.id,
                        groupID: user?.groupID,
                    } as User)
            );
            allUsers = [...allUsers, ...(users || [])];
        } while (!!nextToken);
    } catch (e) {
        return { error: `Could not get a list of all users.` };
    }
    return { result: allUsers };
};

const addUserToGroup = async (
    id: string,
    groupID: string
): Promise<ApiResponse<User>> => {
    try {
        const userGQ = await callGraphQL<CreateUserMutation>(createUser, {
            input: {
                id,
                groupID,
            },
        });
        const user = userGQ?.data?.createUser as User;
        return { result: user || null };
    } catch (e) {
        return { error: `Could not add user '${id}' to group '${groupID}'.` };
    }
};

const updateUserGroup = async (
    id: string,
    groupID: string
): Promise<ApiResponse<User>> => {
    try {
        const userGQ = await callGraphQL<UpdateUserMutation>(updateUser, {
            input: {
                id,
                groupID,
            },
        });
        const user = userGQ?.data?.updateUser as User;
        return { result: user || null };
    } catch (e) {
        return {
            error: `Could not update user '${id}' to group '${groupID}'.`,
        };
    }
};

const removeUserFromGroup = async (
    id: string,
    groupID: string
): Promise<ApiResponse<null>> => {
    try {
        await callGraphQL<DeleteUserMutation>(deleteUser, {
            input: {
                id,
            },
        });
        return { result: null };
    } catch (e) {
        return {
            error: `Could not remove user '${id}' from group '${groupID}'.`,
        };
    }
};

const addGroup = async (user: any): Promise<ApiResponse<Group>> => {
    try {
        const groupsGQ = await callGraphQL<CreateGroupMutation>(createGroup, {
            input: {
                id: uuidv4(),
                groupLeaderUsername: user.Username,
            },
        });
        const group = groupsGQ?.data?.createGroup as Group;
        return { result: group || null };
    } catch (e) {
        return { error: `Could not add a group.` };
    }
};

const removeGroup = async (group: any): Promise<ApiResponse<null>> => {
    try {
        await callGraphQL<DeleteGroupMutation>(deleteGroup, {
            input: {
                id: group.id,
            },
        });
        return { result: null };
    } catch (e) {
        return { error: `Could not remove group with ID '${group.id}'.` };
    }
};

export {
    getGroupMembers,
    listAllGroups,
    listAllUsers,
    addGroup,
    removeGroup,
    addUserToGroup,
    updateUserGroup,
    removeUserFromGroup
};
