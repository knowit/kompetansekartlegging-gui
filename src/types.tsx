import { GetFormDefinitionWithQuestionsQuery } from "./API";

export type AnswerData = {
    topic: string,
    group: string,
    category: string,
    rating: number|null
};
export type Answers = {
    [key: string]: AnswerData
};
export type QuestionData = {
    text: string,
    topic: string,
    group: string,
    category: string
}
export type Questions = {
    [key: string]: QuestionData
}

export type AggregatedCategory = {
    category: String,
    aggregatedValue: number,
    numberOfValues: number,
    aggregatedAverage: number
};

export type AnsweredQuestion = {
    question: QuestionData,
    answer: number
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
                            category: string
                        }
                    }
                ]
            }
        }
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