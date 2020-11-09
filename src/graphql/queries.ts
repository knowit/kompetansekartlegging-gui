/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserForm = /* GraphQL */ `
  query GetUserForm($id: ID!) {
    getUserForm(id: $id) {
      id
      questionAnswers {
        items {
          id
          userFormID
          knowledge
          motivation
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      formDefinition {
        id
        formDefinitionID
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
export const listUserForms = /* GraphQL */ `
  query ListUserForms(
    $filter: ModelUserFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        questionAnswers {
          nextToken
        }
        formDefinition {
          id
          formDefinitionID
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getQuestionAnswer = /* GraphQL */ `
  query GetQuestionAnswer($id: ID!) {
    getQuestionAnswer(id: $id) {
      id
      userFormID
      question {
        id
        text
        topic
        qid
        index
        category
        createdAt
        updatedAt
      }
      knowledge
      motivation
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listQuestionAnswers = /* GraphQL */ `
  query ListQuestionAnswers(
    $filter: ModelQuestionAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userFormID
        question {
          id
          text
          topic
          qid
          index
          category
          createdAt
          updatedAt
        }
        knowledge
        motivation
        createdAt
        updatedAt
        owner
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
      qid
      index
      category
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
        qid
        index
        category
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
      formDefinitionID
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
export const listFormDefinitions = /* GraphQL */ `
  query ListFormDefinitions(
    $filter: ModelFormDefinitionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormDefinitions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        formDefinitionID
        questions {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
