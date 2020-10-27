

export type AnswerData = {
    questionId: string,
    topic: string,
    category: string,
    knowledge: number,
    motivation: number
};

export type Answers = {
    [key: string]: AnswerData
};

export type QuestionData = {
    id: string,
    text: string,
    topic: string,
    category: string
};

export type Questions = {
    [key: string]: QuestionData
};

export type AggregatedAnswer = {
    category: String,
    totalAnswerValue: number,
    numberOfAnswerValues: number,
    answerAverage: number,
    totalMotivationValue: number,
    numberOfMotivationValues: number,
    motivationAverage: number
};

export type CalculatedAnswer = {
    category: string,
    totalKnowledgeValue: number,
    numberOfKnowledgeValues: number,
    knowledgeAverage: number,
    totalMotivationValue: number,
    numberOfMotivationValues: number,
    motivationAverage: number
};

export type CalculationData = {
    questionIds: string[],
    category: string,
    knowledgeCount: number,
    knowledgeTotal: number,
    motivationCount: number,
    motivationTotal: number
};

export type ResultData = {
    category: string,
    averageKnowledge: number,
    averageMotivation: number
};

export type AnsweredQuestion = {
    question: QuestionData,
    answer: number,
    motivation: number
};

// export interface FormDefinitionWithQuestions 
//     extends Omit<Exclude<GetFormDefinitionWithQuestionsQuery["getFormDefinition"], null>, "__typename"> {}

export type FormDefinitionWithQuestions = {
    data: {
        getFormDefinition: {
            id: String,
            questions: {
                items: [
                    {
                        question: {
                            id: string,
                            text: string,
                            topic: string,
                            category: string,
                        }
                    }
                ]
            }
        }
    }
}

export type FormDefinition = {
    getFormDefinition: {
        id: String,
        questions: {
            items: [
                {
                    question: {
                        id: string,
                        text: string,
                        topic: string,
                        category: string,
                    }
                }
            ]
        }
    }
};

export type UserFormWithAnswers = {
    listUserForms: {
        items: [
            {
                id: string,
                createdAt: string,
                questionAnswers: {
                    items: [
                        UserAnswer
                    ]
                }

            }
        ]
    }
};

export type UserAnswer = {
    question: {
        id: string
    }
    id: string,
    knowledge: number,
    motivation: number
}

export type ListedFormDefinition = {
    listFormDefinitions: {
        items: [
            {
                createdAt: string,
                id: string
            }
        ]
    }
}

export type UserFormCreated = {
    createUserForm: {
        id: string,
        createdAt: string,
        updatedAt: string,
        owner: string
    }
}

export type UserFormList = {
    listUserForms: {
        items: [
            {
                id: string,
                createdAt: string,
                questionAnswers: {
                    items: [
                        UserAnswer
                    ]
                }
            }
        ]
    }
};

export type AnswerProps = {
    createUserForm: () => void,
    updateAnswer: (qustionId: string, knowledgeValue: number, motivationValue: number) => void,
    formDefinition: FormDefinition | null,
    answers: AnswerData[],
    submitFeedback: string,
    changeActiveCategory: (newCategoryIndex: string) => void,
    categories: string[],
    activeCategory: string
};

export type UserProps = {
    deleteUserData: () => void,
    listUserForms: () => void
};

export type StatsProps = {
    data: AnsweredQuestion[]
}

export type FromAppProps = {
    answerProps: AnswerProps,
    statsProps: StatsProps,
    userProps: UserProps
}

export type SliderProps = {
    sliderChanged: (newValue: number, motivation: boolean) => void,
    motivation: boolean,
    value: number
};

export type QuestionProps = {
    updateAnswer: (qustionId: string, knowledgeValue: number, motivationValue: number) => void,
    topic: string,
    text: string,
    questionId: string,
    knowledgeDefaultValue: number,
    motivationDefaultValue: number
};

export type BatchCreatedQuestionAnswer = {
    batchCreateQuestionAnswer: {
        answer: number,
        createdAt: string,
        id: string,
        owner: string,
        userFormID: string,
        question: {
            id: string,
            text: string,
            topic: string,
        }
    }[]
};

//Types for new card functionality
// export enum CardTypes {
//     Overview = 0,
//     ScaleDescription = 1,
//     YourAnswer = 2
// };

export type OverviewProps = {
    commonCardProps: CommonCardProps,
    radarData: AnswerData[]
};

export type ScaleDescriptionProps = {
    commonCardProps: CommonCardProps
};

export type YourAnswerProps = {
    commonCardProps: CommonCardProps,
    createUserForm: () => void,
    updateAnswer: (qustionId: string, knowledgeValue: number, motivationValue: number) => void,
    formDefinition: FormDefinition | null,
    answers: AnswerData[],
    submitFeedback: string,
    changeActiveCategory: (newCategoryIndex: string) => void,
    categories: string[],
    activeCategory: string
};

type CommonCardProps = {
    setActiveCard: (cardIndex: number, active: boolean) => void,
    active: boolean,
    index: number
};

// export type User = {
//     Session: string,
//     attributes: {
//         email: string,
//         email_verified: boolean,
//         identities: string,
//         name: string,
//         picture: string,
//         sub: string
//     }
// }
