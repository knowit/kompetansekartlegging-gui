/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserForm = /* GraphQL */ `
  subscription OnCreateUserForm($owner: String!) {
    onCreateUserForm(owner: $owner) {
      id
      questionAnswers {
        items {
          id
          userFormID
          answer
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUserForm = /* GraphQL */ `
  subscription OnUpdateUserForm($owner: String!) {
    onUpdateUserForm(owner: $owner) {
      id
      questionAnswers {
        items {
          id
          userFormID
          answer
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUserForm = /* GraphQL */ `
  subscription OnDeleteUserForm($owner: String!) {
    onDeleteUserForm(owner: $owner) {
      id
      questionAnswers {
        items {
          id
          userFormID
          answer
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateQuestionAnswer = /* GraphQL */ `
  subscription OnCreateQuestionAnswer($owner: String!) {
    onCreateQuestionAnswer(owner: $owner) {
      id
      userFormID
      question {
        id
        text
        topic
        category
        formDefinitions {
          nextToken
        }
        createdAt
        updatedAt
      }
      answer
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateQuestionAnswer = /* GraphQL */ `
  subscription OnUpdateQuestionAnswer($owner: String!) {
    onUpdateQuestionAnswer(owner: $owner) {
      id
      userFormID
      question {
        id
        text
        topic
        category
        formDefinitions {
          nextToken
        }
        createdAt
        updatedAt
      }
      answer
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteQuestionAnswer = /* GraphQL */ `
  subscription OnDeleteQuestionAnswer($owner: String!) {
    onDeleteQuestionAnswer(owner: $owner) {
      id
      userFormID
      question {
        id
        text
        topic
        category
        formDefinitions {
          nextToken
        }
        createdAt
        updatedAt
      }
      answer
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
      formDefinitions {
        items {
          id
          formDefinitionID
          questionID
          createdAt
          updatedAt
        }
        nextToken
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
      category
      formDefinitions {
        items {
          id
          formDefinitionID
          questionID
          createdAt
          updatedAt
        }
        nextToken
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
      category
      formDefinitions {
        items {
          id
          formDefinitionID
          questionID
          createdAt
          updatedAt
        }
        nextToken
      }
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
        items {
          id
          formDefinitionID
          questionID
          createdAt
          updatedAt
        }
        nextToken
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
        items {
          id
          formDefinitionID
          questionID
          createdAt
          updatedAt
        }
        nextToken
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
        items {
          id
          formDefinitionID
          questionID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateQuestionFormDefinitionConnection = /* GraphQL */ `
  subscription OnCreateQuestionFormDefinitionConnection {
    onCreateQuestionFormDefinitionConnection {
      id
      formDefinitionID
      questionID
      question {
        id
        text
        topic
        category
        formDefinitions {
          nextToken
        }
        createdAt
        updatedAt
      }
      formDefinition {
        id
        questions {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateQuestionFormDefinitionConnection = /* GraphQL */ `
  subscription OnUpdateQuestionFormDefinitionConnection {
    onUpdateQuestionFormDefinitionConnection {
      id
      formDefinitionID
      questionID
      question {
        id
        text
        topic
        category
        formDefinitions {
          nextToken
        }
        createdAt
        updatedAt
      }
      formDefinition {
        id
        questions {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteQuestionFormDefinitionConnection = /* GraphQL */ `
  subscription OnDeleteQuestionFormDefinitionConnection {
    onDeleteQuestionFormDefinitionConnection {
      id
      formDefinitionID
      questionID
      question {
        id
        text
        topic
        category
        formDefinitions {
          nextToken
        }
        createdAt
        updatedAt
      }
      formDefinition {
        id
        questions {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
