import { MenuButton, Panel } from "./components/Content";
import { AlertType } from "./components/AlertNotification";

export type AnswerData = {
    questionId: string,
    topic: string,
    category: string,
    knowledge: number,
    motivation: number,
    updatedAt: number,
    index: number
};

export type Answers = {
    [key: string]: AnswerData
};

export type Question = {
    id: string,
    qid: string | undefined,
    createdAt: string,
    text: string,
    topic: string,
    index: number,
    category: {
        id: string,
        text: string,
        description: string | undefined,
        index: number | undefined
    }
};

export type QuestionAnswer = {
    id: string,
    qid: string | undefined,
    createdAt: string,
    text: string,
    topic: string,
    index: number,
    category: {
        id: string,
        text: string,
        description: string | undefined,
        index: number | undefined
    },
    knowledge: number,
    motivation: number,
    updatedAt: number,
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
    question: Question,
    answer: number,
    motivation: number
};

export type TopicScoreWithIcon = {
    topic: string,
    score: number,
    icon: number
};

export type FormDefinitionWithQuestions = {
    data: {
        getFormDefinition: {
            id: String,
            questions: {
                items: [Question]
            }
        }
    }
};

export type CreateQuestionAnswerResult = {
    batchCreateQuestionAnswer: {
        status: string,
        error: string,
        failedInputs: [{
            id: string,
            userFormID: string,
            questionID: string,
            knowledge: number,
            motivation: number,
            environmentID: string,
            formDefinitionID: string
        }]
    }
};

export type Category = {
    id: string,
    text: string,
    description: string,
    createdAt: string,
    index: number
};

export type FormDefinition = {
    id: String,
    createdAt: string,
    questions: {
        items: [Question]
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
    updatedAt: string,
    question: Question
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

export type FormProps = {
    createUserForm: () => void,
    submitAndProceed: () => void,
    updateAnswer: (category: string, sliderMap: Map<string, SliderValues>) => void,
    formDefinition: FormDefinition | null,
    questionAnswers: Map<string, QuestionAnswer[]>,
    answers: AnswerData[],
    submitFeedback: string,
    categories: string[],
    activeCategory: string,
    setIsCategorySubmitted: (categorySubmitted: boolean) => void,
    isMobile: boolean,
    alerts: AlertState | undefined,
    scrollToTop: () => void
};

export type CategoryProps = {
    name: string,
    children: JSX.Element[],
    isMobile: boolean,
};

export type UserProps = {
    deleteUserData: () => void,
    listUserForms: () => void
};

export type StatsProps = {
    data: AnsweredQuestion[]
}

export type FromAppProps = {
    answerProps: FormProps,
    statsProps: StatsProps,
    userProps: UserProps
}

export type SliderProps = {
    sliderChanged: (newValue: number, motivation: boolean) => void,
    motivation: boolean,
    value: number,
    isMobile: boolean
};

export type QuestionProps = {
    updateAnswer: (category: string, sliderMap: Map<string, SliderValues>) => void,
    topic: string,
    text: string,
    questionId: string,
    knowledgeDefaultValue: number,
    motivationDefaultValue: number,
    setIsCategorySubmitted: (categorySubmitted: boolean) => void,
    isMobile: boolean,
    alerts: AlertState | undefined,
    sliderValues: Map<string, SliderValues>,
    setSliderValues: (questionId: string, values: SliderValues) => void
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

export type OverviewProps = {
    activePanel: Panel,
    questionAnswers: Map<string, QuestionAnswer[]>,
    categories: string[],
    isMobile: boolean
};

export type ScaleDescriptionProps = {
    activePanel: Panel,
    isMobile: boolean
};

export type YourAnswerProps = {
    activePanel: Panel,
    setIsCategorySubmitted: (categorySubmitted: boolean) => void,
    createUserForm: () => void,
    submitAndProceed: () => void,
    updateAnswer: (category: string, sliderMap: Map<string, SliderValues>) => void,
    formDefinition: FormDefinition | null,
    questionAnswers: Map<string, QuestionAnswer[]>,
    answers: AnswerData[],
    submitFeedback: string,
    changeActiveCategory: (newCategoryIndex: string) => void,
    categories: string[],
    activeCategory: string,
    setAnswerEditMode: (editMode: boolean) => void,
    answerEditMode: boolean,
    isMobile: boolean,
    alerts: AlertState | undefined,
    checkIfCategoryIsSubmitted:(buttonType: MenuButton, category?: string | undefined) => void,
    collapseMobileCategories: boolean,
    categoryNavRef:  React.MutableRefObject<HTMLInputElement | null>,
    scrollToTop: () => void
};

export interface AlertState {
    qidMap: Map<string, Alert>,
    categoryMap: Map<string, number>
}

export interface Alert {
    type: AlertType,
    message: string
}

export type HighlightsProps = {
    questionAnswers: Map<string, QuestionAnswer[]>,
    isMobile: boolean
};

export type ResultDiagramProps = {
    questionAnswers: Map<string, QuestionAnswer[]>,
    categories: string[],
    isMobile: boolean
};

export type AnswerDiagramProps = {
    questionAnswers: Map<string, QuestionAnswer[]>,
    activeCategory: string,
    isMobile: boolean
};

export type NavBarProps = {
    user: any,
    callbackDelete: () => void,
    setAnswerHistoryOpen: (answerHistoryOpen: boolean) => void,
    isMobile: boolean
};

export type NavBarPropsDesktop = {
    handleDeleteAnswers: (event: React.MouseEvent<EventTarget>) => void,
    handleConfirmDelete: (event: React.MouseEvent<EventTarget>) => void,
    handleDisplayAnswers: (event: React.MouseEvent<EventTarget>) => void,
    handleCloseAlert: () => void,
    anchorRef: React.RefObject<HTMLButtonElement>,
    userName: string,
    userPicture: string,
    deleteAlertOpen: boolean,
}

export type NavBarPropsMobile = {
    menuButtons : JSX.Element[],
    activePanel: Panel,
}


export type AlertDialogProps = {
    setAlertDialogOpen: (alertDialogOpen: boolean) => void;
    alertDialogOpen: boolean,
    changeActiveCategory: (newCategoryIndex: string) => void,
    clickedCategory: string,
    setIsCategorySubmitted: (categorySubmitted: boolean) => void,
    resetAnswers: () => void,
    isMobile: boolean,
    leaveFormButtonClicked?: () => void
};

export type AnswerHistoryProps = {
    setHistoryViewOpen: (historyViewOpen: boolean) => void,
    historyViewOpen: boolean,
    history: UserFormWithAnswers[],
    formDefinition?: FormDefinition,
    isMobile: boolean,
};

export type HistoryTreeViewProps = {
    data: UserFormWithAnswers[]
};

export type ContentProps = {
    user: any
    setAnswerHistoryOpen: (historyViewOpen: boolean) => void,
    answerHistoryOpen: boolean,
    isMobile: boolean
};

export type ChartData = {
    name: string,
    valueKnowledge: number[]
    valueMotivation: number[]
}

export type CombinedChartProps = {
    chartData: ChartData[],
    className?: string
};

export type SliderValues = { //Used in form and question
    knowledge: number,
    motivation: number
};


