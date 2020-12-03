/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelUserFormFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  sortKeyConstant?: ModelStringInput | null,
  formDefinitionID?: ModelIDInput | null,
  and?: Array< ModelUserFormFilterInput | null > | null,
  or?: Array< ModelUserFormFilterInput | null > | null,
  not?: ModelUserFormFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelFormDefinitionFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  sortKeyConstant?: ModelStringInput | null,
  and?: Array< ModelFormDefinitionFilterInput | null > | null,
  or?: Array< ModelFormDefinitionFilterInput | null > | null,
  not?: ModelFormDefinitionFilterInput | null,
};

export type CreateQuestionAnswerInput = {
  id?: string | null,
  userFormID: string,
  questionID: string,
  knowledge: number,
  motivation: number,
  environmentID: string,
};

export type CreateFormDefinitionInput = {
  id?: string | null,
  createdAt?: string | null,
  sortKeyConstant: string,
};

export type ModelFormDefinitionConditionInput = {
  createdAt?: ModelStringInput | null,
  sortKeyConstant?: ModelStringInput | null,
  and?: Array< ModelFormDefinitionConditionInput | null > | null,
  or?: Array< ModelFormDefinitionConditionInput | null > | null,
  not?: ModelFormDefinitionConditionInput | null,
};

export type UpdateFormDefinitionInput = {
  id: string,
  createdAt?: string | null,
  sortKeyConstant?: string | null,
};

export type DeleteFormDefinitionInput = {
  id?: string | null,
};

export type CreateUserFormInput = {
  id?: string | null,
  createdAt?: string | null,
  sortKeyConstant: string,
  formDefinitionID: string,
};

export type ModelUserFormConditionInput = {
  createdAt?: ModelStringInput | null,
  sortKeyConstant?: ModelStringInput | null,
  formDefinitionID?: ModelIDInput | null,
  and?: Array< ModelUserFormConditionInput | null > | null,
  or?: Array< ModelUserFormConditionInput | null > | null,
  not?: ModelUserFormConditionInput | null,
};

export type UpdateUserFormInput = {
  id: string,
  createdAt?: string | null,
  sortKeyConstant?: string | null,
  formDefinitionID?: string | null,
};

export type DeleteUserFormInput = {
  id?: string | null,
};

export type ModelQuestionAnswerConditionInput = {
  userFormID?: ModelIDInput | null,
  questionID?: ModelIDInput | null,
  knowledge?: ModelFloatInput | null,
  motivation?: ModelFloatInput | null,
  and?: Array< ModelQuestionAnswerConditionInput | null > | null,
  or?: Array< ModelQuestionAnswerConditionInput | null > | null,
  not?: ModelQuestionAnswerConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateQuestionAnswerInput = {
  id: string,
  userFormID?: string | null,
  questionID?: string | null,
  knowledge?: number | null,
  motivation?: number | null,
};

export type DeleteQuestionAnswerInput = {
  id?: string | null,
};

export type CreateQuestionInput = {
  id?: string | null,
  text: string,
  topic: string,
  qid?: string | null,
  index?: number | null,
  formDefinitionID: string,
  categoryID: string,
};

export type ModelQuestionConditionInput = {
  text?: ModelStringInput | null,
  topic?: ModelStringInput | null,
  qid?: ModelStringInput | null,
  index?: ModelIntInput | null,
  formDefinitionID?: ModelIDInput | null,
  categoryID?: ModelIDInput | null,
  and?: Array< ModelQuestionConditionInput | null > | null,
  or?: Array< ModelQuestionConditionInput | null > | null,
  not?: ModelQuestionConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateQuestionInput = {
  id: string,
  text?: string | null,
  topic?: string | null,
  qid?: string | null,
  index?: number | null,
  formDefinitionID?: string | null,
  categoryID?: string | null,
};

export type DeleteQuestionInput = {
  id?: string | null,
};

export type CreateCategoryInput = {
  id?: string | null,
  text: string,
  description?: string | null,
};

export type ModelCategoryConditionInput = {
  text?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  text?: string | null,
  description?: string | null,
};

export type DeleteCategoryInput = {
  id?: string | null,
};

export type ModelQuestionAnswerFilterInput = {
  id?: ModelIDInput | null,
  userFormID?: ModelIDInput | null,
  questionID?: ModelIDInput | null,
  knowledge?: ModelFloatInput | null,
  motivation?: ModelFloatInput | null,
  and?: Array< ModelQuestionAnswerFilterInput | null > | null,
  or?: Array< ModelQuestionAnswerFilterInput | null > | null,
  not?: ModelQuestionAnswerFilterInput | null,
};

export type ModelQuestionFilterInput = {
  id?: ModelIDInput | null,
  text?: ModelStringInput | null,
  topic?: ModelStringInput | null,
  qid?: ModelStringInput | null,
  index?: ModelIntInput | null,
  formDefinitionID?: ModelIDInput | null,
  categoryID?: ModelIDInput | null,
  and?: Array< ModelQuestionFilterInput | null > | null,
  or?: Array< ModelQuestionFilterInput | null > | null,
  not?: ModelQuestionFilterInput | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  text?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ListUserFormsWithAnswersQueryVariables = {
  filter?: ModelUserFormFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserFormsWithAnswersQuery = {
  listUserForms:  {
    __typename: "ModelUserFormConnection",
    items:  Array< {
      __typename: "UserForm",
      id: string,
      createdAt: string,
      formDefinitionID: string,
      questionAnswers:  {
        __typename: "ModelQuestionAnswerConnection",
        items:  Array< {
          __typename: "QuestionAnswer",
          id: string,
          knowledge: number,
          motivation: number,
          createdAt: string,
          question:  {
            __typename: "Question",
            id: string,
            category:  {
              __typename: "Category",
              text: string,
              id: string,
            },
          },
        } | null > | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type FormByCreatedAttQueryVariables = {
  sortKeyConstant?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFormDefinitionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FormByCreatedAttQuery = {
  formByCreatedAt:  {
    __typename: "ModelFormDefinitionConnection",
    items:  Array< {
      __typename: "FormDefinition",
      id: string,
      createdAt: string,
      questions:  {
        __typename: "ModelQuestionConnection",
        items:  Array< {
          __typename: "Question",
          category:  {
            __typename: "Category",
            id: string,
            text: string,
          },
          id: string,
          createdAt: string,
          text: string,
          topic: string,
          qid: string | null,
        } | null > | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type BatchCreateQuestionAnswer2MutationVariables = {
  input?: Array< CreateQuestionAnswerInput | null > | null,
};

export type BatchCreateQuestionAnswer2Mutation = {
  batchCreateQuestionAnswer:  Array< {
    __typename: "QuestionAnswer",
    owner: string | null,
  } | null > | null,
};

export type BatchCreateQuestionAnswerMutationVariables = {
  input?: Array< CreateQuestionAnswerInput | null > | null,
};

export type BatchCreateQuestionAnswerMutation = {
  batchCreateQuestionAnswer:  Array< {
    __typename: "QuestionAnswer",
    id: string,
    userFormID: string,
    questionID: string,
    knowledge: number,
    motivation: number,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      qid: string | null,
      index: number | null,
      formDefinitionID: string,
      categoryID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null > | null,
};

export type CreateFormDefinitionMutationVariables = {
  input: CreateFormDefinitionInput,
  condition?: ModelFormDefinitionConditionInput | null,
};

export type CreateFormDefinitionMutation = {
  createFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateFormDefinitionMutationVariables = {
  input: UpdateFormDefinitionInput,
  condition?: ModelFormDefinitionConditionInput | null,
};

export type UpdateFormDefinitionMutation = {
  updateFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteFormDefinitionMutationVariables = {
  input: DeleteFormDefinitionInput,
  condition?: ModelFormDefinitionConditionInput | null,
};

export type DeleteFormDefinitionMutation = {
  deleteFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateUserFormMutationVariables = {
  input: CreateUserFormInput,
  condition?: ModelUserFormConditionInput | null,
};

export type CreateUserFormMutation = {
  createUserForm:  {
    __typename: "UserForm",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    formDefinitionID: string,
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      createdAt: string,
      sortKeyConstant: string,
      updatedAt: string,
    },
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateUserFormMutationVariables = {
  input: UpdateUserFormInput,
  condition?: ModelUserFormConditionInput | null,
};

export type UpdateUserFormMutation = {
  updateUserForm:  {
    __typename: "UserForm",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    formDefinitionID: string,
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      createdAt: string,
      sortKeyConstant: string,
      updatedAt: string,
    },
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteUserFormMutationVariables = {
  input: DeleteUserFormInput,
  condition?: ModelUserFormConditionInput | null,
};

export type DeleteUserFormMutation = {
  deleteUserForm:  {
    __typename: "UserForm",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    formDefinitionID: string,
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      createdAt: string,
      sortKeyConstant: string,
      updatedAt: string,
    },
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateQuestionAnswerMutationVariables = {
  input: CreateQuestionAnswerInput,
  condition?: ModelQuestionAnswerConditionInput | null,
};

export type CreateQuestionAnswerMutation = {
  createQuestionAnswer:  {
    __typename: "QuestionAnswer",
    id: string,
    userFormID: string,
    questionID: string,
    knowledge: number,
    motivation: number,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      qid: string | null,
      index: number | null,
      formDefinitionID: string,
      categoryID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateQuestionAnswerMutationVariables = {
  input: UpdateQuestionAnswerInput,
  condition?: ModelQuestionAnswerConditionInput | null,
};

export type UpdateQuestionAnswerMutation = {
  updateQuestionAnswer:  {
    __typename: "QuestionAnswer",
    id: string,
    userFormID: string,
    questionID: string,
    knowledge: number,
    motivation: number,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      qid: string | null,
      index: number | null,
      formDefinitionID: string,
      categoryID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteQuestionAnswerMutationVariables = {
  input: DeleteQuestionAnswerInput,
  condition?: ModelQuestionAnswerConditionInput | null,
};

export type DeleteQuestionAnswerMutation = {
  deleteQuestionAnswer:  {
    __typename: "QuestionAnswer",
    id: string,
    userFormID: string,
    questionID: string,
    knowledge: number,
    motivation: number,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      qid: string | null,
      index: number | null,
      formDefinitionID: string,
      categoryID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateQuestionMutationVariables = {
  input: CreateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type CreateQuestionMutation = {
  createQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    topic: string,
    qid: string | null,
    index: number | null,
    formDefinitionID: string,
    categoryID: string,
    category:  {
      __typename: "Category",
      id: string,
      text: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuestionMutationVariables = {
  input: UpdateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type UpdateQuestionMutation = {
  updateQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    topic: string,
    qid: string | null,
    index: number | null,
    formDefinitionID: string,
    categoryID: string,
    category:  {
      __typename: "Category",
      id: string,
      text: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuestionMutationVariables = {
  input: DeleteQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type DeleteQuestionMutation = {
  deleteQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    topic: string,
    qid: string | null,
    index: number | null,
    formDefinitionID: string,
    categoryID: string,
    category:  {
      __typename: "Category",
      id: string,
      text: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory:  {
    __typename: "Category",
    id: string,
    text: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory:  {
    __typename: "Category",
    id: string,
    text: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory:  {
    __typename: "Category",
    id: string,
    text: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetFormDefinitionQueryVariables = {
  id: string,
};

export type GetFormDefinitionQuery = {
  getFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListFormDefinitionsQueryVariables = {
  filter?: ModelFormDefinitionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFormDefinitionsQuery = {
  listFormDefinitions:  {
    __typename: "ModelFormDefinitionConnection",
    items:  Array< {
      __typename: "FormDefinition",
      id: string,
      createdAt: string,
      sortKeyConstant: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserFormQueryVariables = {
  id: string,
};

export type GetUserFormQuery = {
  getUserForm:  {
    __typename: "UserForm",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    formDefinitionID: string,
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      createdAt: string,
      sortKeyConstant: string,
      updatedAt: string,
    },
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListUserFormsQueryVariables = {
  filter?: ModelUserFormFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserFormsQuery = {
  listUserForms:  {
    __typename: "ModelUserFormConnection",
    items:  Array< {
      __typename: "UserForm",
      id: string,
      createdAt: string,
      sortKeyConstant: string,
      formDefinitionID: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetQuestionAnswerQueryVariables = {
  id: string,
};

export type GetQuestionAnswerQuery = {
  getQuestionAnswer:  {
    __typename: "QuestionAnswer",
    id: string,
    userFormID: string,
    questionID: string,
    knowledge: number,
    motivation: number,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      qid: string | null,
      index: number | null,
      formDefinitionID: string,
      categoryID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListQuestionAnswersQueryVariables = {
  filter?: ModelQuestionAnswerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionAnswersQuery = {
  listQuestionAnswers:  {
    __typename: "ModelQuestionAnswerConnection",
    items:  Array< {
      __typename: "QuestionAnswer",
      id: string,
      userFormID: string,
      questionID: string,
      knowledge: number,
      motivation: number,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetQuestionQueryVariables = {
  id: string,
};

export type GetQuestionQuery = {
  getQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    topic: string,
    qid: string | null,
    index: number | null,
    formDefinitionID: string,
    categoryID: string,
    category:  {
      __typename: "Category",
      id: string,
      text: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListQuestionsQueryVariables = {
  filter?: ModelQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionsQuery = {
  listQuestions:  {
    __typename: "ModelQuestionConnection",
    items:  Array< {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      qid: string | null,
      index: number | null,
      formDefinitionID: string,
      categoryID: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory:  {
    __typename: "Category",
    id: string,
    text: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategorysQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategorysQuery = {
  listCategorys:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      text: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type FormByCreatedAtQueryVariables = {
  sortKeyConstant?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFormDefinitionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FormByCreatedAtQuery = {
  formByCreatedAt:  {
    __typename: "ModelFormDefinitionConnection",
    items:  Array< {
      __typename: "FormDefinition",
      id: string,
      createdAt: string,
      sortKeyConstant: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type UserFormByCreatedAtQueryVariables = {
  sortKeyConstant?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFormFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserFormByCreatedAtQuery = {
  userFormByCreatedAt:  {
    __typename: "ModelUserFormConnection",
    items:  Array< {
      __typename: "UserForm",
      id: string,
      createdAt: string,
      sortKeyConstant: string,
      formDefinitionID: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateFormDefinitionSubscription = {
  onCreateFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateFormDefinitionSubscription = {
  onUpdateFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteFormDefinitionSubscription = {
  onDeleteFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    questions:  {
      __typename: "ModelQuestionConnection",
      nextToken: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateUserFormSubscriptionVariables = {
  owner: string,
};

export type OnCreateUserFormSubscription = {
  onCreateUserForm:  {
    __typename: "UserForm",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    formDefinitionID: string,
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      createdAt: string,
      sortKeyConstant: string,
      updatedAt: string,
    },
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateUserFormSubscriptionVariables = {
  owner: string,
};

export type OnUpdateUserFormSubscription = {
  onUpdateUserForm:  {
    __typename: "UserForm",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    formDefinitionID: string,
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      createdAt: string,
      sortKeyConstant: string,
      updatedAt: string,
    },
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteUserFormSubscriptionVariables = {
  owner: string,
};

export type OnDeleteUserFormSubscription = {
  onDeleteUserForm:  {
    __typename: "UserForm",
    id: string,
    createdAt: string,
    sortKeyConstant: string,
    formDefinitionID: string,
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      createdAt: string,
      sortKeyConstant: string,
      updatedAt: string,
    },
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateQuestionAnswerSubscriptionVariables = {
  owner: string,
};

export type OnCreateQuestionAnswerSubscription = {
  onCreateQuestionAnswer:  {
    __typename: "QuestionAnswer",
    id: string,
    userFormID: string,
    questionID: string,
    knowledge: number,
    motivation: number,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      qid: string | null,
      index: number | null,
      formDefinitionID: string,
      categoryID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateQuestionAnswerSubscriptionVariables = {
  owner: string,
};

export type OnUpdateQuestionAnswerSubscription = {
  onUpdateQuestionAnswer:  {
    __typename: "QuestionAnswer",
    id: string,
    userFormID: string,
    questionID: string,
    knowledge: number,
    motivation: number,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      qid: string | null,
      index: number | null,
      formDefinitionID: string,
      categoryID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteQuestionAnswerSubscriptionVariables = {
  owner: string,
};

export type OnDeleteQuestionAnswerSubscription = {
  onDeleteQuestionAnswer:  {
    __typename: "QuestionAnswer",
    id: string,
    userFormID: string,
    questionID: string,
    knowledge: number,
    motivation: number,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      qid: string | null,
      index: number | null,
      formDefinitionID: string,
      categoryID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateQuestionSubscription = {
  onCreateQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    topic: string,
    qid: string | null,
    index: number | null,
    formDefinitionID: string,
    categoryID: string,
    category:  {
      __typename: "Category",
      id: string,
      text: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuestionSubscription = {
  onUpdateQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    topic: string,
    qid: string | null,
    index: number | null,
    formDefinitionID: string,
    categoryID: string,
    category:  {
      __typename: "Category",
      id: string,
      text: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuestionSubscription = {
  onDeleteQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    topic: string,
    qid: string | null,
    index: number | null,
    formDefinitionID: string,
    categoryID: string,
    category:  {
      __typename: "Category",
      id: string,
      text: string,
      description: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory:  {
    __typename: "Category",
    id: string,
    text: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory:  {
    __typename: "Category",
    id: string,
    text: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory:  {
    __typename: "Category",
    id: string,
    text: string,
    description: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
