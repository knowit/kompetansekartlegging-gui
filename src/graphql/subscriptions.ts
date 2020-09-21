/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserForm = /* GraphQL */ `
  subscription OnCreateUserForm($owner: String) {
    onCreateUserForm(owner: $owner) {
      id
      formDefinition {
        id
        questions {
          id
          text
          topic
          category
          answerType
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      answers
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUserForm = /* GraphQL */ `
  subscription OnUpdateUserForm($owner: String) {
    onUpdateUserForm(owner: $owner) {
      id
      formDefinition {
        id
        questions {
          id
          text
          topic
          category
          answerType
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      answers
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUserForm = /* GraphQL */ `
  subscription OnDeleteUserForm($owner: String) {
    onDeleteUserForm(owner: $owner) {
      id
      formDefinition {
        id
        questions {
          id
          text
          topic
          category
          answerType
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      answers
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
      category
      answerType
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
      category
      answerType
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
      category
      answerType
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFormDefinition = /* GraphQL */ `
  subscription OnCreateFormDefinition {
    onCreateFormDefinition {
      id
      questions {
        id
        text
        topic
        category
        answerType
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFormDefinition = /* GraphQL */ `
  subscription OnUpdateFormDefinition {
    onUpdateFormDefinition {
      id
      questions {
        id
        text
        topic
        category
        answerType
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFormDefinition = /* GraphQL */ `
  subscription OnDeleteFormDefinition {
    onDeleteFormDefinition {
      id
      questions {
        id
        text
        topic
        category
        answerType
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
