import React, { useState, useCallback } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";

import {
    listQuestionsByCategoryID,
    updateQuestionIndex,
    updateQuestionTextTopicAndCategory,
} from "../catalogApi";
import useApiGet from "../useApiGet";
import { Question } from "../../../API";
import { compareByIndex } from "../helpers";
import QuestionListItem from "./QuestionListItem";

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

    const [dummy, setDummy] = useState(0);
    const { result: questions, error, loading } = useApiGet({
        getFn: memoizedCallback,
        refreshCounter: dummy,
        cmpFn: compareByIndex,
    });

    const moveQuestion = async (question: any, direction: number) => {
        setEnableUpdates(false);

        const me = question;
        const swapWith = questions.find(
            (c) => c.index === me.index - direction
        );
        await updateQuestionIndex(me, swapWith.index);
        await updateQuestionIndex(swapWith, me.index);

        setDummy((dummy) => dummy + 1);
        setEnableUpdates(true);
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
        setDummy((dummy) => dummy + 1);
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
                            enableUpdates={enableUpdates}
                            questions={questions}
                            categories={categories}
                        />
                    ))}
                </List>
            )}
        </>
    );
};

export default QuestionList;
