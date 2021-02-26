/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFormDefinition = /* GraphQL */ `
    subscription OnCreateFormDefinition {
        onCreateFormDefinition {
            id
            createdAt
            sortKeyConstant
            questions {
                nextToken
            }
            updatedAt
        }
    }
`;
export const onUpdateFormDefinition = /* GraphQL */ `
    subscription OnUpdateFormDefinition {
        onUpdateFormDefinition {
            id
            createdAt
            sortKeyConstant
            questions {
                nextToken
            }
            updatedAt
        }
    }
`;
export const onDeleteFormDefinition = /* GraphQL */ `
    subscription OnDeleteFormDefinition {
        onDeleteFormDefinition {
            id
            createdAt
            sortKeyConstant
            questions {
                nextToken
            }
            updatedAt
        }
    }
`;
export const onCreateUserForm = /* GraphQL */ `
    subscription OnCreateUserForm($owner: String) {
        onCreateUserForm(owner: $owner) {
            id
            createdAt
            owner
            formDefinitionID
            questionAnswers {
                nextToken
            }
            formDefinition {
                id
                createdAt
                sortKeyConstant
                updatedAt
            }
            updatedAt
        }
    }
`;
export const onUpdateUserForm = /* GraphQL */ `
    subscription OnUpdateUserForm($owner: String) {
        onUpdateUserForm(owner: $owner) {
            id
            createdAt
            owner
            formDefinitionID
            questionAnswers {
                nextToken
            }
            formDefinition {
                id
                createdAt
                sortKeyConstant
                updatedAt
            }
            updatedAt
        }
    }
`;
export const onDeleteUserForm = /* GraphQL */ `
    subscription OnDeleteUserForm($owner: String) {
        onDeleteUserForm(owner: $owner) {
            id
            createdAt
            owner
            formDefinitionID
            questionAnswers {
                nextToken
            }
            formDefinition {
                id
                createdAt
                sortKeyConstant
                updatedAt
            }
            updatedAt
        }
    }
`;
export const onCreateQuestionAnswer = /* GraphQL */ `
    subscription OnCreateQuestionAnswer($owner: String) {
        onCreateQuestionAnswer(owner: $owner) {
            id
            userFormID
            questionID
            knowledge
            motivation
            question {
                id
                text
                topic
                qid
                index
                formDefinitionID
                categoryID
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
            owner
        }
    }
`;
export const onUpdateQuestionAnswer = /* GraphQL */ `
    subscription OnUpdateQuestionAnswer($owner: String) {
        onUpdateQuestionAnswer(owner: $owner) {
            id
            userFormID
            questionID
            knowledge
            motivation
            question {
                id
                text
                topic
                qid
                index
                formDefinitionID
                categoryID
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
            owner
        }
    }
`;
export const onDeleteQuestionAnswer = /* GraphQL */ `
    subscription OnDeleteQuestionAnswer($owner: String) {
        onDeleteQuestionAnswer(owner: $owner) {
            id
            userFormID
            questionID
            knowledge
            motivation
            question {
                id
                text
                topic
                qid
                index
                formDefinitionID
                categoryID
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
            owner
        }
    }
`;
export const onCreateQuestion = /* GraphQL */ `
    subscription OnCreateQuestion {
        onCreateQuestion {
            id
            text
            topic
            qid
            index
            formDefinitionID
            categoryID
            category {
                id
                text
                description
                index
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`;
export const onUpdateQuestion = /* GraphQL */ `
    subscription OnUpdateQuestion {
        onUpdateQuestion {
            id
            text
            topic
            qid
            index
            formDefinitionID
            categoryID
            category {
                id
                text
                description
                index
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`;
export const onDeleteQuestion = /* GraphQL */ `
    subscription OnDeleteQuestion {
        onDeleteQuestion {
            id
            text
            topic
            qid
            index
            formDefinitionID
            categoryID
            category {
                id
                text
                description
                index
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`;
export const onCreateCategory = /* GraphQL */ `
    subscription OnCreateCategory {
        onCreateCategory {
            id
            text
            description
            index
            createdAt
            updatedAt
        }
    }
`;
export const onUpdateCategory = /* GraphQL */ `
    subscription OnUpdateCategory {
        onUpdateCategory {
            id
            text
            description
            index
            createdAt
            updatedAt
        }
    }
`;
export const onDeleteCategory = /* GraphQL */ `
    subscription OnDeleteCategory {
        onDeleteCategory {
            id
            text
            description
            index
            createdAt
            updatedAt
        }
    }
`;
export const onCreateGroup = /* GraphQL */ `
    subscription OnCreateGroup {
        onCreateGroup {
            id
            groupLeaderID
            groupLeader {
                id
                groupID
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`;
export const onUpdateGroup = /* GraphQL */ `
    subscription OnUpdateGroup {
        onUpdateGroup {
            id
            groupLeaderID
            groupLeader {
                id
                groupID
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`;
export const onDeleteGroup = /* GraphQL */ `
    subscription OnDeleteGroup {
        onDeleteGroup {
            id
            groupLeaderID
            groupLeader {
                id
                groupID
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`;
export const onCreateUser = /* GraphQL */ `
    subscription OnCreateUser {
        onCreateUser {
            id
            groupID
            group {
                id
                groupLeaderID
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`;
export const onUpdateUser = /* GraphQL */ `
    subscription OnUpdateUser {
        onUpdateUser {
            id
            groupID
            group {
                id
                groupLeaderID
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`;
export const onDeleteUser = /* GraphQL */ `
    subscription OnDeleteUser {
        onDeleteUser {
            id
            groupID
            group {
                id
                groupLeaderID
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`;
