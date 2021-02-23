/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelUserFormFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
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
  formDefinitionID: string,
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
  owner?: string | null,
  formDefinitionID: string,
};

export type ModelUserFormConditionInput = {
  createdAt?: ModelStringInput | null,
  formDefinitionID?: ModelIDInput | null,
  and?: Array< ModelUserFormConditionInput | null > | null,
  or?: Array< ModelUserFormConditionInput | null > | null,
  not?: ModelUserFormConditionInput | null,
};

export type UpdateUserFormInput = {
  id: string,
  createdAt?: string | null,
  owner?: string | null,
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
  index?: number | null,
};

export type ModelCategoryConditionInput = {
  text?: ModelStringInput | null,
  description?: ModelStringInput | null,
  index?: ModelIntInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  text?: string | null,
  description?: string | null,
  index?: number | null,
};

export type DeleteCategoryInput = {
  id?: string | null,
};

export type CreateGroupInput = {
  id?: string | null,
  groupLeaderID: string,
};

export type ModelGroupConditionInput = {
  groupLeaderID?: ModelStringInput | null,
  and?: Array< ModelGroupConditionInput | null > | null,
  or?: Array< ModelGroupConditionInput | null > | null,
  not?: ModelGroupConditionInput | null,
};

export type UpdateGroupInput = {
  id: string,
  groupLeaderID?: string | null,
};

export type DeleteGroupInput = {
  id?: string | null,
};

export type CreateUserInput = {
  id: string,
  groupID: string,
};

export type ModelUserConditionInput = {
  groupID?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  groupID?: string | null,
};

export type DeleteUserInput = {
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
  index?: ModelIntInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelGroupFilterInput = {
  id?: ModelIDInput | null,
  groupLeaderID?: ModelStringInput | null,
  and?: Array< ModelGroupFilterInput | null > | null,
  or?: Array< ModelGroupFilterInput | null > | null,
  not?: ModelGroupFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelStringInput | null,
  groupID?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
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
            description: string | null,
            index: number | null,
          },
          index: number | null,
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

export type FormByCreatedAtPaginatedQueryVariables = {
  sortKeyConstant?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFormDefinitionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FormByCreatedAtPaginatedQuery = {
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
            description: string | null,
            index: number | null,
          },
          index: number | null,
          id: string,
          createdAt: string,
          text: string,
          topic: string,
          qid: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type CustomUserFormByCreatedAtQueryVariables = {
  owner?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFormFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CustomUserFormByCreatedAtQuery = {
  userFormByCreatedAt:  {
    __typename: "ModelUserFormConnection",
    items:  Array< {
      __typename: "UserForm",
      id: string,
      formDefinitionID: string,
      questionAnswers:  {
        __typename: "ModelQuestionAnswerConnection",
        items:  Array< {
          __typename: "QuestionAnswer",
          id: string,
          knowledge: number,
          motivation: number,
          updatedAt: string,
          question:  {
            __typename: "Question",
            id: string,
            text: string,
            topic: string,
            category:  {
              __typename: "Category",
              id: string,
              text: string,
              description: string | null,
              index: number | null,
            },
          },
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
  batchCreateQuestionAnswer:  {
    __typename: "CreateQuestionAnswerResult",
    status: number,
    error: string | null,
    failedInputs:  Array< {
      __typename: "CreateQuestionAnswerFailedInput",
      id: string | null,
      userFormID: string,
      questionID: string,
      knowledge: number,
      motivation: number,
      environmentID: string,
      formDefinitionID: string,
    } | null > | null,
  } | null,
};

export type BatchCreateQuestionAnswerMutationVariables = {
  input?: Array< CreateQuestionAnswerInput | null > | null,
};

export type BatchCreateQuestionAnswerMutation = {
  batchCreateQuestionAnswer:  {
    __typename: "CreateQuestionAnswerResult",
    status: number,
    error: string | null,
    failedInputs:  Array< {
      __typename: "CreateQuestionAnswerFailedInput",
      id: string | null,
      userFormID: string,
      questionID: string,
      knowledge: number,
      motivation: number,
      environmentID: string,
      formDefinitionID: string,
    } | null > | null,
  } | null,
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
    owner: string | null,
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
    owner: string | null,
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
    owner: string | null,
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
      index: number | null,
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
      index: number | null,
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
      index: number | null,
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
    index: number | null,
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
    index: number | null,
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
    index: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGroupMutationVariables = {
  input: CreateGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type CreateGroupMutation = {
  createGroup:  {
    __typename: "Group",
    id: string,
    groupLeaderID: string,
    groupLeader:  {
      __typename: "User",
      id: string,
      groupID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGroupMutationVariables = {
  input: UpdateGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type UpdateGroupMutation = {
  updateGroup:  {
    __typename: "Group",
    id: string,
    groupLeaderID: string,
    groupLeader:  {
      __typename: "User",
      id: string,
      groupID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGroupMutationVariables = {
  input: DeleteGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type DeleteGroupMutation = {
  deleteGroup:  {
    __typename: "Group",
    id: string,
    groupLeaderID: string,
    groupLeader:  {
      __typename: "User",
      id: string,
      groupID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    groupID: string,
    group:  {
      __typename: "Group",
      id: string,
      groupLeaderID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    groupID: string,
    group:  {
      __typename: "Group",
      id: string,
      groupLeaderID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    groupID: string,
    group:  {
      __typename: "Group",
      id: string,
      groupLeaderID: string,
      createdAt: string,
      updatedAt: string,
    },
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
    owner: string | null,
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
      owner: string | null,
      formDefinitionID: string,
      updatedAt: string,
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
      index: number | null,
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
    index: number | null,
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
      index: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetGroupQueryVariables = {
  id: string,
};

export type GetGroupQuery = {
  getGroup:  {
    __typename: "Group",
    id: string,
    groupLeaderID: string,
    groupLeader:  {
      __typename: "User",
      id: string,
      groupID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGroupsQueryVariables = {
  filter?: ModelGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGroupsQuery = {
  listGroups:  {
    __typename: "ModelGroupConnection",
    items:  Array< {
      __typename: "Group",
      id: string,
      groupLeaderID: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    groupID: string,
    group:  {
      __typename: "Group",
      id: string,
      groupLeaderID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      groupID: string,
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
  owner?: string | null,
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
      owner: string | null,
      formDefinitionID: string,
      updatedAt: string,
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
  owner?: string | null,
};

export type OnCreateUserFormSubscription = {
  onCreateUserForm:  {
    __typename: "UserForm",
    id: string,
    createdAt: string,
    owner: string | null,
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
  } | null,
};

export type OnUpdateUserFormSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateUserFormSubscription = {
  onUpdateUserForm:  {
    __typename: "UserForm",
    id: string,
    createdAt: string,
    owner: string | null,
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
  } | null,
};

export type OnDeleteUserFormSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteUserFormSubscription = {
  onDeleteUserForm:  {
    __typename: "UserForm",
    id: string,
    createdAt: string,
    owner: string | null,
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
  } | null,
};

export type OnCreateQuestionAnswerSubscriptionVariables = {
  owner?: string | null,
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
  owner?: string | null,
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
  owner?: string | null,
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
      index: number | null,
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
      index: number | null,
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
      index: number | null,
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
    index: number | null,
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
    index: number | null,
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
    index: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGroupSubscription = {
  onCreateGroup:  {
    __typename: "Group",
    id: string,
    groupLeaderID: string,
    groupLeader:  {
      __typename: "User",
      id: string,
      groupID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGroupSubscription = {
  onUpdateGroup:  {
    __typename: "Group",
    id: string,
    groupLeaderID: string,
    groupLeader:  {
      __typename: "User",
      id: string,
      groupID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGroupSubscription = {
  onDeleteGroup:  {
    __typename: "Group",
    id: string,
    groupLeaderID: string,
    groupLeader:  {
      __typename: "User",
      id: string,
      groupID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    groupID: string,
    group:  {
      __typename: "Group",
      id: string,
      groupLeaderID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    groupID: string,
    group:  {
      __typename: "Group",
      id: string,
      groupLeaderID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    groupID: string,
    group:  {
      __typename: "Group",
      id: string,
      groupLeaderID: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
