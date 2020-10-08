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
          }
        }
      }
      id
    }
  }
`;

export const listUserFormsWithAnswers = /* GraphQL */ `
  query ListUserFormsWithAnswers {
    listUserForms {
      items {
        id
        questionAnswers {
          items {
            id
            knowledge
            motivation
          }
        }
        createdAt
      }
    }
  }
`;
