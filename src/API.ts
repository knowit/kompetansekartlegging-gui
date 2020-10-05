/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateQuestionAnswerInput = {
  id?: string | null,
  userFormID: string,
  answer: number,
  questionAnswerQuestionId: string,
};

export type CreateUserFormInput = {
  id?: string | null,
  userFormFormDefinitionId: string,
};

export type ModelUserFormConditionInput = {
  and?: Array< ModelUserFormConditionInput | null > | null,
  or?: Array< ModelUserFormConditionInput | null > | null,
  not?: ModelUserFormConditionInput | null,
};

export type UpdateUserFormInput = {
  id: string,
  userFormFormDefinitionId?: string | null,
};

export type DeleteUserFormInput = {
  id?: string | null,
};

export type ModelQuestionAnswerConditionInput = {
  userFormID?: ModelIDInput | null,
  answer?: ModelIntInput | null,
  and?: Array< ModelQuestionAnswerConditionInput | null > | null,
  or?: Array< ModelQuestionAnswerConditionInput | null > | null,
  not?: ModelQuestionAnswerConditionInput | null,
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

export type UpdateQuestionAnswerInput = {
  id: string,
  userFormID?: string | null,
  answer?: number | null,
  questionAnswerQuestionId?: string | null,
};

export type DeleteQuestionAnswerInput = {
  id?: string | null,
};

export type CreateQuestionInput = {
  id?: string | null,
  text: string,
  topic: string,
  category: string,
  type: string,
};

export type ModelQuestionConditionInput = {
  text?: ModelStringInput | null,
  topic?: ModelStringInput | null,
  category?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelQuestionConditionInput | null > | null,
  or?: Array< ModelQuestionConditionInput | null > | null,
  not?: ModelQuestionConditionInput | null,
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

export type UpdateQuestionInput = {
  id: string,
  text?: string | null,
  topic?: string | null,
  category?: string | null,
  type?: string | null,
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

export type CreateQuestionFormDefinitionConnectionInput = {
  id?: string | null,
  formDefinitionID: string,
  questionID: string,
};

export type ModelQuestionFormDefinitionConnectionConditionInput = {
  formDefinitionID?: ModelIDInput | null,
  questionID?: ModelIDInput | null,
  and?: Array< ModelQuestionFormDefinitionConnectionConditionInput | null > | null,
  or?: Array< ModelQuestionFormDefinitionConnectionConditionInput | null > | null,
  not?: ModelQuestionFormDefinitionConnectionConditionInput | null,
};

export type UpdateQuestionFormDefinitionConnectionInput = {
  id: string,
  formDefinitionID?: string | null,
  questionID?: string | null,
};

export type DeleteQuestionFormDefinitionConnectionInput = {
  id?: string | null,
};

export type ModelUserFormFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelUserFormFilterInput | null > | null,
  or?: Array< ModelUserFormFilterInput | null > | null,
  not?: ModelUserFormFilterInput | null,
};

export type ModelQuestionAnswerFilterInput = {
  id?: ModelIDInput | null,
  userFormID?: ModelIDInput | null,
  answer?: ModelIntInput | null,
  and?: Array< ModelQuestionAnswerFilterInput | null > | null,
  or?: Array< ModelQuestionAnswerFilterInput | null > | null,
  not?: ModelQuestionAnswerFilterInput | null,
};

export type ModelQuestionFilterInput = {
  id?: ModelIDInput | null,
  text?: ModelStringInput | null,
  topic?: ModelStringInput | null,
  category?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelQuestionFilterInput | null > | null,
  or?: Array< ModelQuestionFilterInput | null > | null,
  not?: ModelQuestionFilterInput | null,
};

export type ModelFormDefinitionFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelFormDefinitionFilterInput | null > | null,
  or?: Array< ModelFormDefinitionFilterInput | null > | null,
  not?: ModelFormDefinitionFilterInput | null,
};

export type GetFormDefinitionWithQuestionsQueryVariables = {
  id: string,
};

export type GetFormDefinitionWithQuestionsQuery = {
  getFormDefinition:  {
    __typename: "FormDefinition",
    questions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        question:  {
          __typename: "Question",
          id: string,
          text: string,
          topic: string,
          category: string,
        },
      } | null > | null,
    } | null,
    id: string,
  } | null,
};

export type BatchCreateQuestionAnswerMutationVariables = {
  input?: Array< CreateQuestionAnswerInput | null > | null,
};

export type BatchCreateQuestionAnswerMutation = {
  batchCreateQuestionAnswer:  Array< {
    __typename: "QuestionAnswer",
    id: string,
    userFormID: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    answer: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null > | null,
};

export type CreateUserFormMutationVariables = {
  input: CreateUserFormInput,
  condition?: ModelUserFormConditionInput | null,
};

export type CreateUserFormMutation = {
  createUserForm:  {
    __typename: "UserForm",
    id: string,
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      items:  Array< {
        __typename: "QuestionAnswer",
        id: string,
        userFormID: string,
        answer: number,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
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
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      items:  Array< {
        __typename: "QuestionAnswer",
        id: string,
        userFormID: string,
        answer: number,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
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
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      items:  Array< {
        __typename: "QuestionAnswer",
        id: string,
        userFormID: string,
        answer: number,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
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
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    answer: number,
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
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    answer: number,
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
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    answer: number,
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
    category: string,
    type: string,
    formDefinitions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    type: string,
    formDefinitions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    type: string,
    formDefinitions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    questions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    questions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    questions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateQuestionFormDefinitionConnectionMutationVariables = {
  input: CreateQuestionFormDefinitionConnectionInput,
  condition?: ModelQuestionFormDefinitionConnectionConditionInput | null,
};

export type CreateQuestionFormDefinitionConnectionMutation = {
  createQuestionFormDefinitionConnection:  {
    __typename: "QuestionFormDefinitionConnection",
    id: string,
    formDefinitionID: string,
    questionID: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuestionFormDefinitionConnectionMutationVariables = {
  input: UpdateQuestionFormDefinitionConnectionInput,
  condition?: ModelQuestionFormDefinitionConnectionConditionInput | null,
};

export type UpdateQuestionFormDefinitionConnectionMutation = {
  updateQuestionFormDefinitionConnection:  {
    __typename: "QuestionFormDefinitionConnection",
    id: string,
    formDefinitionID: string,
    questionID: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuestionFormDefinitionConnectionMutationVariables = {
  input: DeleteQuestionFormDefinitionConnectionInput,
  condition?: ModelQuestionFormDefinitionConnectionConditionInput | null,
};

export type DeleteQuestionFormDefinitionConnectionMutation = {
  deleteQuestionFormDefinitionConnection:  {
    __typename: "QuestionFormDefinitionConnection",
    id: string,
    formDefinitionID: string,
    questionID: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
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
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      items:  Array< {
        __typename: "QuestionAnswer",
        id: string,
        userFormID: string,
        answer: number,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
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
      questionAnswers:  {
        __typename: "ModelQuestionAnswerConnection",
        nextToken: string | null,
      } | null,
      formDefinition:  {
        __typename: "FormDefinition",
        id: string,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
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
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    answer: number,
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
      question:  {
        __typename: "Question",
        id: string,
        text: string,
        topic: string,
        category: string,
        type: string,
        createdAt: string,
        updatedAt: string,
      },
      answer: number,
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
    category: string,
    type: string,
    formDefinitions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
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
    questions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserFormSubscriptionVariables = {
  owner: string,
};

export type OnCreateUserFormSubscription = {
  onCreateUserForm:  {
    __typename: "UserForm",
    id: string,
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      items:  Array< {
        __typename: "QuestionAnswer",
        id: string,
        userFormID: string,
        answer: number,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
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
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      items:  Array< {
        __typename: "QuestionAnswer",
        id: string,
        userFormID: string,
        answer: number,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
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
    questionAnswers:  {
      __typename: "ModelQuestionAnswerConnection",
      items:  Array< {
        __typename: "QuestionAnswer",
        id: string,
        userFormID: string,
        answer: number,
        createdAt: string,
        updatedAt: string,
        owner: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
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
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    answer: number,
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
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    answer: number,
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
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    answer: number,
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
    category: string,
    type: string,
    formDefinitions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    type: string,
    formDefinitions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    type: string,
    formDefinitions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFormDefinitionSubscription = {
  onCreateFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    questions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFormDefinitionSubscription = {
  onUpdateFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    questions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFormDefinitionSubscription = {
  onDeleteFormDefinition:  {
    __typename: "FormDefinition",
    id: string,
    questions:  {
      __typename: "ModelQuestionFormDefinitionConnectionConnection",
      items:  Array< {
        __typename: "QuestionFormDefinitionConnection",
        id: string,
        formDefinitionID: string,
        questionID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateQuestionFormDefinitionConnectionSubscription = {
  onCreateQuestionFormDefinitionConnection:  {
    __typename: "QuestionFormDefinitionConnection",
    id: string,
    formDefinitionID: string,
    questionID: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuestionFormDefinitionConnectionSubscription = {
  onUpdateQuestionFormDefinitionConnection:  {
    __typename: "QuestionFormDefinitionConnection",
    id: string,
    formDefinitionID: string,
    questionID: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuestionFormDefinitionConnectionSubscription = {
  onDeleteQuestionFormDefinitionConnection:  {
    __typename: "QuestionFormDefinitionConnection",
    id: string,
    formDefinitionID: string,
    questionID: string,
    question:  {
      __typename: "Question",
      id: string,
      text: string,
      topic: string,
      category: string,
      type: string,
      formDefinitions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    formDefinition:  {
      __typename: "FormDefinition",
      id: string,
      questions:  {
        __typename: "ModelQuestionFormDefinitionConnectionConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
