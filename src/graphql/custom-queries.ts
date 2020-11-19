/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
import { ModelSortDirection } from '../API'

// export const getFormDefinitionWithQuestions = /* GraphQL */ `
//   query GetFormDefinitionWithQuestions($id: ID!) {
//     getFormDefinition(id: $id) {
//       questions {
//         items {
//           question {
//             id
//             text
//             topic
//             category
//             index
//           }
//         }
//       }
//       id
//     }
//   }
// `;

// export const listUserFormsWithAnswers = /* GraphQL */ `
//   query ListUserFormsWithAnswers($limit: Int, $nextToken: String) {
//     listUserForms(limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         questionAnswers {
//           items {
//             question {
//               id
//             }
//             id
//             knowledge
//             motivation
//           }
//         }
//         createdAt
//       }
//       nextToken
//     }
//   }
// `;

export const listUserFormsWithAnswers = /* GraphQL */ `
  query ListUserFormsWithAnswers(
    $filter: ModelUserFormFilterInput, 
    $limit: Int, 
    $nextToken: String
  ) {
    listUserForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        formDefinitionID
        questionAnswers {
          items {
            id
            knowledge
            motivation
            createdAt
            question {
              id
              category {
                text
                id
              }
            }
          }
        }
      }
      nextToken
    }
  }
`;

export const formByCreatedAtInputConsts = {
  limit: 1,
  dummy: "111",
  sortDirection: ModelSortDirection.DESC,
};

export const formByCreatedAtt = /* GraphQL */ `
  query FormByCreatedAtt(
    $dummy: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFormDefinitionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    formByCreatedAt(
      dummy: $dummy
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        questions {
          items {
            category {
              id
              text
            }
            id
            createdAt
            text
            topic
            qid
          }
        }
      }
      nextToken
    }
  }
`;


