/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserForm = /* GraphQL */ `
  mutation CreateUserForm(
    $input: CreateUserFormInput!
    $condition: ModelUserFormConditionInput
  ) {
    createUserForm(input: $input, condition: $condition) {
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
      answerType
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
      answerType
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
      answerType
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
export const updateFormDefinition = /* GraphQL */ `
  mutation UpdateFormDefinition(
    $input: UpdateFormDefinitionInput!
    $condition: ModelFormDefinitionConditionInput
  ) {
    updateFormDefinition(input: $input, condition: $condition) {
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
export const deleteFormDefinition = /* GraphQL */ `
  mutation DeleteFormDefinition(
    $input: DeleteFormDefinitionInput!
    $condition: ModelFormDefinitionConditionInput
  ) {
    deleteFormDefinition(input: $input, condition: $condition) {
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
