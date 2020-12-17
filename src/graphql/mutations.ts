/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const batchCreateQuestionAnswer = /* GraphQL */ `
  mutation BatchCreateQuestionAnswer($input: [CreateQuestionAnswerInput]) {
    batchCreateQuestionAnswer(input: $input) {
      status
      failedInputs {
        id
        userFormID
        questionID
        knowledge
        motivation
        environmentID
        formDefinitionID
      }
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
      createdAt
      sortKeyConstant
      questions {
        nextToken
      }
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
      createdAt
      sortKeyConstant
      questions {
        nextToken
      }
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
      createdAt
      sortKeyConstant
      questions {
        nextToken
      }
      updatedAt
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
      createdAt
      owner
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
      createdAt
      owner
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
      createdAt
      owner
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
export const updateQuestionAnswer = /* GraphQL */ `
  mutation UpdateQuestionAnswer(
    $input: UpdateQuestionAnswerInput!
    $condition: ModelQuestionAnswerConditionInput
  ) {
    updateQuestionAnswer(input: $input, condition: $condition) {
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
export const deleteQuestionAnswer = /* GraphQL */ `
  mutation DeleteQuestionAnswer(
    $input: DeleteQuestionAnswerInput!
    $condition: ModelQuestionAnswerConditionInput
  ) {
    deleteQuestionAnswer(input: $input, condition: $condition) {
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
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      text
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      text
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      text
      description
      createdAt
      updatedAt
    }
  }
`;
