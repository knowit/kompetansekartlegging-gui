import React, { useState, useCallback } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { listQuestionsByCategoryID, updateQuestionIndex } from "../catalogApi";
import useApiGet from "../useApiGet";
import { KnowitColors } from "../../../styles";
import { Question } from "../../../API";
import { compareByIndex } from "../helpers";

const useQuestionListStyles = makeStyles(() =>
    createStyles({
        button: {
            color: KnowitColors.darkBrown,
            marginLeft: "16px",
        },
        listItem: {
            transition: "150ms",
            backgroundColor: KnowitColors.beige,
            padding: "16px",
            paddingTop: "0",
            marginTop: "0",
            borderRadius: "16px",
            marginBottom: "10px",
            "&:hover": {
                background: KnowitColors.greyGreen,
            },
        },
        listItemText: {
            color: KnowitColors.darkBrown,
            "& span": {
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            },
        },
        actions: {
            display: "flex",
            alignItems: "center",
        },
    })
);

const QuestionList = ({ id, formDefinitionID, formDefinitionLabel }: any) => {
    const classes = useQuestionListStyles();
    const memoizedCallback = useCallback(() => listQuestionsByCategoryID(id), [
        id,
    ]);
    const [enableUpdates, setEnableUpdates] = useState<boolean>(true);

    const [dummy, setDummy] = useState(0);
    const { result: categories, error, loading } = useApiGet({
        getFn: memoizedCallback,
        refreshCounter: dummy,
        cmpFn: compareByIndex,
    });

    const moveQuestion = async (question: any, direction: number) => {
        setEnableUpdates(false);

        const me = question;
        const swapWith = categories.find(
            (c) => c.index === me.index - direction
        );
        await updateQuestionIndex(me, swapWith.index);
        await updateQuestionIndex(swapWith, me.index);

        setDummy((dummy) => dummy + 1);
        setEnableUpdates(true);
    };

    return (
        <>
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && categories && (
                <List>
                    {categories.map((c: Question, ind: number) => {
                        return (
                            <ListItem key={c.id} className={classes.listItem}>
                                <ListItemText
                                    primary={
                                        <>
                                            {ind + 1}. {c.topic}
                                            <div className={classes.actions}>
                                                <IconButton
                                                    onClick={() => 1}
                                                    className={classes.button}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => 1}
                                                    className={classes.button}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <ButtonGroup
                                                    disableElevation
                                                    variant="text"
                                                    size="small"
                                                    orientation="vertical"
                                                >
                                                    <Button
                                                        size="small"
                                                        onClick={() =>
                                                            moveQuestion(c, 1)
                                                        }
                                                        className={
                                                            classes.button
                                                        }
                                                        disabled={
                                                            !enableUpdates ||
                                                            ind === 0
                                                        }
                                                    >
                                                        <KeyboardArrowUpIcon fontSize="small" />
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        onClick={() =>
                                                            moveQuestion(c, -1)
                                                        }
                                                        className={
                                                            classes.button
                                                        }
                                                        disabled={
                                                            !enableUpdates ||
                                                            ind ===
                                                                categories.length -
                                                                    1
                                                        }
                                                    >
                                                        <KeyboardArrowDownIcon fontSize="small" />
                                                    </Button>
                                                </ButtonGroup>
                                            </div>
                                        </>
                                    }
                                    secondary={c.text}
                                    className={classes.listItemText}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </>
    );
};

export default QuestionList;
