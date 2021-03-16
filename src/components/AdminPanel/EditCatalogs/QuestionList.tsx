import React, { useState, useCallback } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";

import {
    listQuestionsByCategoryID,
    updateQuestionIndex,
    updateQuestionTextTopicAndCategory,
    deleteQuestion as deleteQuestionApi,
} from "../catalogApi";
import useApiGet from "../useApiGet";
import { Question } from "../../../API";
import { compareByIndex } from "../helpers";
import QuestionListItem from "./QuestionListItem";
import DeleteQuestionDialog from "./DeleteQuestionDialog";

const QuestionList = ({
    id,
    categories,
    formDefinitionID,
    formDefinitionLabel,
}: any) => {
    const memoizedCallback = useCallback(() => listQuestionsByCategoryID(id), [
        id,
    ]);
    const [enableUpdates, setEnableUpdates] = useState<boolean>(true);

    const { result: questions, error, loading, refresh } = useApiGet({
        getFn: memoizedCallback,
        cmpFn: compareByIndex,
    });

    const [
        showDeleteQuestionDialog,
        setShowDeleteQuestionDialog,
    ] = useState<boolean>(false);
    const [questionToDelete, setQuestionToDelete] = useState<any>();
    const deleteQuestion = (question: any) => {
        setShowDeleteQuestionDialog(true);
        setQuestionToDelete(question);
    };
    const deleteQuestionConfirm = async () => {
        await deleteQuestionApi(questionToDelete.id);
        setShowDeleteQuestionDialog(false);
        refresh();
    };

    const moveQuestion = async (question: any, direction: number) => {
        setEnableUpdates(false);

        const me = question;
        const swapWith = questions.find(
            (c) => c.index === me.index - direction
        );
        await updateQuestionIndex(me, swapWith.index);
        await updateQuestionIndex(swapWith, me.index);

        setEnableUpdates(true);
        refresh();
    };

    const saveQuestion = async (
        question: any,
        topic: string,
        text: string,
        categoryID: string
    ) => {
        await updateQuestionTextTopicAndCategory(
            question,
            topic,
            text,
            categoryID
        );
        refresh();
    };

    return (
        <>
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && questions && (
                <List>
                    {questions.map((q: Question, ind: number) => (
                        <QuestionListItem
                            key={q.id}
                            question={q}
                            index={ind}
                            moveQuestion={moveQuestion}
                            saveQuestion={saveQuestion}
                            deleteQuestion={deleteQuestion}
                            enableUpdates={enableUpdates}
                            questions={questions}
                            categories={categories}
                        />
                    ))}
                </List>
            )}
            {questionToDelete && (
                <DeleteQuestionDialog
                    open={showDeleteQuestionDialog}
                    onCancel={() => setShowDeleteQuestionDialog(false)}
                    onExited={() => setQuestionToDelete(null)}
                    onConfirm={deleteQuestionConfirm}
                    question={questionToDelete}
                />
            )}
        </>
    );
};

export default QuestionList;
