import React from "react";

import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import DeleteUserFromGroupDialog from "../AdminPanel/DeleteUserFromGroupDialog";
import GroupMembers from "../AdminPanel/GroupMembers";
import commonStyles from "../AdminPanel/common.module.css"

const Main = ({
    allAvailableUsersAnnotated,
    members,
    groupId,
    isError,
    isLoading,
    addMembersToGroup,
    deleteMember,
    showDeleteUserFromGroupDialog,
    setShowDeleteUserFromGroupDialog,
    memberToDelete,
    setMemberToDelete,
    deleteMemberConfirm,
}: any) => {
    return (
        <Container maxWidth="md" className={commonStyles.container}>
            {isError && <p>An error occured: {isError}</p>}
            {isLoading && <CircularProgress />}
            {!isError && !isLoading && allAvailableUsersAnnotated && (
                <>
                    <Card style={{ marginBottom: "24px" }} variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Rediger din gruppe
                            </Typography>
                            En gruppe består av en gruppeleder og flere
                            gruppebarn. På denne siden kan legge til og fjerne
                            ansatte til og fra gruppen din.
                        </CardContent>
                    </Card>
                    <GroupMembers
                        allUsers={allAvailableUsersAnnotated}
                        members={members}
                        addMembersToGroup={(users: any) =>
                            addMembersToGroup(users, groupId)
                        }
                        deleteMember={(user: any) =>
                            deleteMember(user, groupId)
                        }
                    />
                </>
            )}
            <DeleteUserFromGroupDialog
                open={showDeleteUserFromGroupDialog}
                onCancel={() => setShowDeleteUserFromGroupDialog(false)}
                onExited={() => setMemberToDelete(null)}
                onConfirm={deleteMemberConfirm}
                user={memberToDelete && memberToDelete.user}
                roleName="gruppen"
                disableRoleSuffix
            />
        </Container>
    );
};

export default Main;
