/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFormDefinitionWithQuestions = /* GraphQL */ `
  query GetFormDefinitionWithQuestions($id: ID!) {
    getFormDefinition(id: $id) {
      questions {
        items {
          question {
            id
            text
            topic
            category
            index
          }
        }
      }
      id
    }
  }
`;

export const listUserFormsWithAnswers = /* GraphQL */ `
  query ListUserFormsWithAnswers($limit: Int, $nextToken: String) {
    listUserForms(limit: $limit, nextToken: $nextToken) {
      items {
        id
        questionAnswers {
          items {
            question {
              id
            }
            id
            knowledge
            motivation
          }
        }
        createdAt
      }
      nextToken
    }
  }
`;
