/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserFormInput = {
  id?: string | null,
  answers: Array< string | null >,
};

export type ModelUserFormConditionInput = {
  answers?: ModelStringInput | null,
  and?: Array< ModelUserFormConditionInput | null > | null,
  or?: Array< ModelUserFormConditionInput | null > | null,
  not?: ModelUserFormConditionInput | null,
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

export type UpdateUserFormInput = {
  answers?: Array< string | null > | null,
};

export type DeleteUserFormInput = {
  id?: string | null,
};

export type CreateQuestionInput = {
  id?: string | null,
  text: string,
  topic: string,
  category: string,
  answerType: string,
};

export type ModelQuestionConditionInput = {
  text?: ModelStringInput | null,
  topic?: ModelStringInput | null,
  category?: ModelStringInput | null,
  answerType?: ModelStringInput | null,
  and?: Array< ModelQuestionConditionInput | null > | null,
  or?: Array< ModelQuestionConditionInput | null > | null,
  not?: ModelQuestionConditionInput | null,
};

export type UpdateQuestionInput = {
  id: string,
  text?: string | null,
  topic?: string | null,
  category?: string | null,
  answerType?: string | null,
};

export type DeleteQuestionInput = {
  id?: string | null,
};

export type CreateFormDefinitionInput = {
  id?: string | null,
};

export type ModelFormDefinitionConditionInput = {
  and?: Array< ModelFormDefinitionConditionInput | null > | null,
  or?: Array< ModelFormDefinitionConditionInput | null > | null,
  not?: ModelFormDefinitionConditionInput | null,
};

export type UpdateFormDefinitionInput = {
  id: string,
};

export type DeleteFormDefinitionInput = {
  id?: string | null,
};

export type ModelUserFormFilterInput = {
  answers?: ModelStringInput | null,
  and?: Array< ModelUserFormFilterInput | null > | null,
  or?: Array< ModelUserFormFilterInput | null > | null,
  not?: ModelUserFormFilterInput | null,
};

export type ModelQuestionFilterInput = {
  id?: ModelIDInput | null,
  text?: ModelStringInput | null,
  topic?: ModelStringInput | null,
  category?: ModelStringInput | null,
  answerType?: ModelStringInput | null,
  and?: Array< ModelQuestionFilterInput | null > | null,
  or?: Array< ModelQuestionFilterInput | null > | null,
  not?: ModelQuestionFilterInput | null,
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

export type ModelFormDefinitionFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelFormDefinitionFilterInput | null > | null,
  or?: Array< ModelFormDefinitionFilterInput | null > | null,
  not?: ModelFormDefinitionFilterInput | null,
};

export type CreateUserFormMutationVariables = {
  input: CreateUserFormInput,
  condition?: ModelUserFormConditionInput | null,
};

export type CreateUserFormMutation = {
  createUserForm:  {
    __typename: "UserForm",
    id: string,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  Array< {
        __typename: "Question",
        id: string,
        text: string,
        topic: string,
        category: string,
        answerType: string,
        createdAt: string,
        updatedAt: string,
      } >,
      createdAt: string,
      updatedAt: string,
    },
    answers: Array< string | null >,
    createdAt: string,
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
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  Array< {
        __typename: "Question",
        id: string,
        text: string,
        topic: string,
        category: string,
        answerType: string,
        createdAt: string,
        updatedAt: string,
      } >,
      createdAt: string,
      updatedAt: string,
    },
    answers: Array< string | null >,
    createdAt: string,
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
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  Array< {
        __typename: "Question",
        id: string,
        text: string,
        topic: string,
        category: string,
        answerType: string,
        createdAt: string,
        updatedAt: string,
      } >,
      createdAt: string,
      updatedAt: string,
    },
    answers: Array< string | null >,
    createdAt: string,
    updatedAt: string,
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
    category: string,
    answerType: string,
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
    category: string,
    answerType: string,
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
    category: string,
    answerType: string,
    createdAt: string,
    updatedAt: string,
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
    questions:  Array< {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      answerType: string,
      createdAt: string,
      updatedAt: string,
    } >,
    createdAt: string,
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
    questions:  Array< {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      answerType: string,
      createdAt: string,
      updatedAt: string,
    } >,
    createdAt: string,
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
    questions:  Array< {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      answerType: string,
      createdAt: string,
      updatedAt: string,
    } >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserFormQueryVariables = {
  id: string,
};

export type GetUserFormQuery = {
  getUserForm:  {
    __typename: "UserForm",
    id: string,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  Array< {
        __typename: "Question",
        id: string,
        text: string,
        topic: string,
        category: string,
        answerType: string,
        createdAt: string,
        updatedAt: string,
      } >,
      createdAt: string,
      updatedAt: string,
    },
    answers: Array< string | null >,
    createdAt: string,
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
      formDefinition:  {
        __typename: "FormDefinition",
        id: string,
        createdAt: string,
        updatedAt: string,
      },
      answers: Array< string | null >,
      createdAt: string,
      updatedAt: string,
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
    category: string,
    answerType: string,
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
      category: string,
      answerType: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetFormDefinitionQueryVariables = {
  id: string,
};

export type GetFormDefinitionQuery = {
  getFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    questions:  Array< {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      answerType: string,
      createdAt: string,
      updatedAt: string,
    } >,
    createdAt: string,
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
      questions:  Array< {
        __typename: "Question",
        id: string,
        text: string,
        topic: string,
        category: string,
        answerType: string,
        createdAt: string,
        updatedAt: string,
      } >,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserFormSubscription = {
  onCreateUserForm:  {
    __typename: "UserForm",
    id: string,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  Array< {
        __typename: "Question",
        id: string,
        text: string,
        topic: string,
        category: string,
        answerType: string,
        createdAt: string,
        updatedAt: string,
      } >,
      createdAt: string,
      updatedAt: string,
    },
    answers: Array< string | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserFormSubscription = {
  onUpdateUserForm:  {
    __typename: "UserForm",
    id: string,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  Array< {
        __typename: "Question",
        id: string,
        text: string,
        topic: string,
        category: string,
        answerType: string,
        createdAt: string,
        updatedAt: string,
      } >,
      createdAt: string,
      updatedAt: string,
    },
    answers: Array< string | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserFormSubscription = {
  onDeleteUserForm:  {
    __typename: "UserForm",
    id: string,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  Array< {
        __typename: "Question",
        id: string,
        text: string,
        topic: string,
        category: string,
        answerType: string,
        createdAt: string,
        updatedAt: string,
      } >,
      createdAt: string,
      updatedAt: string,
    },
    answers: Array< string | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateQuestionSubscription = {
  onCreateQuestion:  {
    __typename: "Question",
    id: string,
    text: string,
    topic: string,
    category: string,
    answerType: string,
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
    category: string,
    answerType: string,
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
    category: string,
    answerType: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFormDefinitionSubscription = {
  onCreateFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    questions:  Array< {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      answerType: string,
      createdAt: string,
      updatedAt: string,
    } >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFormDefinitionSubscription = {
  onUpdateFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    questions:  Array< {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      answerType: string,
      createdAt: string,
      updatedAt: string,
    } >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFormDefinitionSubscription = {
  onDeleteFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    questions:  Array< {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      answerType: string,
      createdAt: string,
      updatedAt: string,
    } >,
    createdAt: string,
    updatedAt: string,
  } | null,
};
