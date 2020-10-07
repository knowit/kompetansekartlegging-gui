

export type AnswerData = {
    questionId: string,
    topic: string,
    type: string,
    category: string,
    rating: number,
    motivation: number
};
export type Answers = {
    [key: string]: AnswerData
};
export type QuestionData = {
    id: string,
    text: string,
    topic: string,
    type: string,
    category: string
}
export type Questions = {
    [key: string]: QuestionData
}

export type AggregatedAnswer = {
    category: String,
    totalAnswerValue: number,
    numberOfAnswerValues: number,
    answerAverage: number,
    totalMotivationValue: number,
    numberOfMotivationValues: number,
    motivationAverage: number
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
                            type: string
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
                        type: string
                    }
                }
            ]
        }
    }
};

export type UserFormCreated = {
    createUserForm: {
        id: string,
        createdAt: string,
        updatedAt: string,
        owner: string
    }
}

export type AnswerProps = {
    createUserForm: () => void,
    updateAnswer: (key: string, rating: number, motivation: boolean) => void,
    formDefinition: FormDefinition | null,
    answers: AnswerData[]
}

export type StatsProps = {
    data: AnsweredQuestion[]
}

export type FromAppProps = {
    answerProps: AnswerProps,
    statsProps: StatsProps
}

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
            type: string
        }
    }[]
}
