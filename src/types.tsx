

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
    category: {
        text: string,
        description: string | undefined
    }
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

export type TopicScoreWithIcon = {
    topic: string,
    score: number,
    icon: number
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
                            category: {
                                id: string,
                                text: string,
                                description: string
                            }
                        }
                    }
                ]
            }
        }
    }
};


export type Category = {
    id: String,
    text: String,
    description: String,
    createdAt: String
};

export type FormDefinition = {
    id: String,
    createdAt: string,
    questions: {
        items: [
            {
                id: string,
                qid: string,
                createdAt: string,
                text: string,
                topic: string,
                category: {
                    id: string,
                    text: string,
                    description: string
                }
            }
        ]
    }
};

export type FormDefinitionByCreatedAt = {
    formByCreatedAt: {
        nextToken: string,
        items: [
            FormDefinition
        ]
    }
};

export type UserFormByCreatedAt = {
    userFormByCreatedAt: {
        nextToken: string,
        items: [
            UserForm
        ]
    }
};

export type UserForm = {
    id: string,
    formDefinitionID: string,
    nextToken: string,
    questionAnswers: {
        items: [
            UserAnswer
        ]
    }
}

export type UserAnswer = {
    id: string,
    knowledge: number,
    motivation: number,
    question: {
        id: string,
        text: string,
        topic: string,
        category: {
            id: string,
            text: string,
            description: string
        }
    }
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

export type UserFormWithAnswers = {
    id: string,
    createdAt: string,
    questionAnswers: {
        items: [
            UserAnswer
        ]
    }
};

export type UserFormList = {
    listUserForms: {
        items: [
            UserFormWithAnswers
        ],
        nextToken: string | null
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
    activeCategory: string,
    setIsCategorySubmitted: (categorySubmitted: boolean) => void,
    isCategorySubmitted: boolean
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
    motivationDefaultValue: number,
    setIsCategorySubmitted: (categorySubmitted: boolean) => void;
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
            qid: string,
            index: number
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
    radarData: AnswerData[],
    isAnswersSubmitted: boolean
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
    activeCategory: string,
    resetAnswers: () => void,
    answerViewModeActive: (viewModeActive: boolean) => void,
    answerViewMode: boolean
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

export type NavBarProps = {
    user: any,
    callbackDelete: () => void,
    setAnswerHistoryOpen: (answerHistoryOpen: boolean) => void
};

export type AlertDialogProps = {
    setAlertDialogOpen: (alertDialogOpen: boolean) => void;
    alertDialogOpen: boolean,
    changeActiveCategory: (newCategoryIndex: string) => void,
    clickedCategory: string,
    setIsCategorySubmitted: (categorySubmitted: boolean) => void,
    resetAnswers: () => void,
};

export type AnswerHistoryProps = {
    setHistoryViewOpen: (historyViewOpen: boolean) => void,
    historyViewOpen: boolean,
    history: UserFormWithAnswers[],
    formDefinition?: FormDefinition,
};

export type HistoryTreeViewProps = {
    data: UserFormWithAnswers[]
};

export type ContentProps = {
    setAnswerHistoryOpen: (historyViewOpen: boolean) => void,
    answerHistoryOpen: boolean
};

export type ChartData = {
    name: string,
    valueKnowledge: number[]
    valueMotivation: number[]
}

export type CombinedChartProps = {
    chartData: ChartData[],
    className?: string
}