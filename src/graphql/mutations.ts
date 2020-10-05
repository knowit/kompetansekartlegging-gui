/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const batchCreateQuestionAnswer = /* GraphQL */ `
  mutation BatchCreateQuestionAnswer($input: [CreateQuestionAnswerInput]) {
    batchCreateQuestionAnswer(input: $input) {
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
export const createUserForm = /* GraphQL */ `
  mutation CreateUserForm(
    $input: CreateUserFormInput!
    $condition: ModelUserFormConditionInput
  ) {
    createUserForm(input: $input, condition: $condition) {
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
      owner
    }
  }
`;
export const updateUserForm = /* GraphQL */ `
  mutation UpdateUserForm(
    $input: UpdateUserFormInput!
    $condition: ModelUserFormConditionInput
  ) {
    updateUserForm(input: $input, condition: $condition) {
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
      owner
    }
  }
`;
export const deleteUserForm = /* GraphQL */ `
  mutation DeleteUserForm(
    $input: DeleteUserFormInput!
    $condition: ModelUserFormConditionInput
  ) {
    deleteUserForm(input: $input, condition: $condition) {
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
      owner
    }
  }
`;
export const createQuestionAnswer = /* GraphQL */ `
  mutation CreateQuestionAnswer(
    $input: CreateQuestionAnswerInput!
    $condition: ModelQuestionAnswerConditionInput
  ) {
    createQuestionAnswer(input: $input, condition: $condition) {
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
export const updateQuestionAnswer = /* GraphQL */ `
  mutation UpdateQuestionAnswer(
    $input: UpdateQuestionAnswerInput!
    $condition: ModelQuestionAnswerConditionInput
  ) {
    updateQuestionAnswer(input: $input, condition: $condition) {
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
export const deleteQuestionAnswer = /* GraphQL */ `
  mutation DeleteQuestionAnswer(
    $input: DeleteQuestionAnswerInput!
    $condition: ModelQuestionAnswerConditionInput
  ) {
    deleteQuestionAnswer(input: $input, condition: $condition) {
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
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
export const createFormDefinition = /* GraphQL */ `
  mutation CreateFormDefinition(
    $input: CreateFormDefinitionInput!
    $condition: ModelFormDefinitionConditionInput
  ) {
    createFormDefinition(input: $input, condition: $condition) {
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
export const updateFormDefinition = /* GraphQL */ `
  mutation UpdateFormDefinition(
    $input: UpdateFormDefinitionInput!
    $condition: ModelFormDefinitionConditionInput
  ) {
    updateFormDefinition(input: $input, condition: $condition) {
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
export const deleteFormDefinition = /* GraphQL */ `
  mutation DeleteFormDefinition(
    $input: DeleteFormDefinitionInput!
    $condition: ModelFormDefinitionConditionInput
  ) {
    deleteFormDefinition(input: $input, condition: $condition) {
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
export const createQuestionFormDefinitionConnection = /* GraphQL */ `
  mutation CreateQuestionFormDefinitionConnection(
    $input: CreateQuestionFormDefinitionConnectionInput!
    $condition: ModelQuestionFormDefinitionConnectionConditionInput
  ) {
    createQuestionFormDefinitionConnection(
      input: $input
      condition: $condition
    ) {
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
export const updateQuestionFormDefinitionConnection = /* GraphQL */ `
  mutation UpdateQuestionFormDefinitionConnection(
    $input: UpdateQuestionFormDefinitionConnectionInput!
    $condition: ModelQuestionFormDefinitionConnectionConditionInput
  ) {
    updateQuestionFormDefinitionConnection(
      input: $input
      condition: $condition
    ) {
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
export const deleteQuestionFormDefinitionConnection = /* GraphQL */ `
  mutation DeleteQuestionFormDefinitionConnection(
    $input: DeleteQuestionFormDefinitionConnectionInput!
    $condition: ModelQuestionFormDefinitionConnectionConditionInput
  ) {
    deleteQuestionFormDefinitionConnection(
      input: $input
      condition: $condition
    ) {
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
