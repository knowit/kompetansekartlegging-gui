/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFormDefinition = /* GraphQL */ `
  query GetFormDefinition($id: ID!) {
    getFormDefinition(id: $id) {
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
export const listFormDefinitions = /* GraphQL */ `
  query ListFormDefinitions(
    $filter: ModelFormDefinitionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormDefinitions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        sortKeyConstant
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserForm = /* GraphQL */ `
  query GetUserForm($id: ID!) {
    getUserForm(id: $id) {
      id
      createdAt
      sortKeyConstant
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
        createdAt
        sortKeyConstant
        formDefinitionID
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
        questionID
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
      formDefinitionID
      categoryID
      category {
        id
        text
        description
        createdAt
        updatedAt
      }
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
        formDefinitionID
        categoryID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      text
      description
      createdAt
      updatedAt
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const formByCreatedAt = /* GraphQL */ `
  query FormByCreatedAt(
    $sortKeyConstant: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFormDefinitionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    formByCreatedAt(
      sortKeyConstant: $sortKeyConstant
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        sortKeyConstant
        updatedAt
      }
      nextToken
    }
  }
`;
export const userFormByCreatedAt = /* GraphQL */ `
  query UserFormByCreatedAt(
    $sortKeyConstant: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userFormByCreatedAt(
      sortKeyConstant: $sortKeyConstant
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        sortKeyConstant
        formDefinitionID
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
