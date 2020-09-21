/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserForm = /* GraphQL */ `
  query GetUserForm($id: ID!) {
    getUserForm(id: $id) {
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
export const listUserForms = /* GraphQL */ `
  query ListUserForms(
    $filter: ModelUserFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        formDefinition {
          id
          createdAt
          updatedAt
        }
        answers
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
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
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        topic
        category
        answerType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFormDefinition = /* GraphQL */ `
  query GetFormDefinition($id: ID!) {
    getFormDefinition(id: $id) {
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
export const listFormDefinitions = /* GraphQL */ `
  query ListFormDefinitions(
    $filter: ModelFormDefinitionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormDefinitions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
