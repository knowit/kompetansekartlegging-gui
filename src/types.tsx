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