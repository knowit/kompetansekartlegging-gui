import React, { useState } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TextField from "@material-ui/core/TextField";

import { KnowitColors } from "../../../styles";
import EditActionButtons from "./EditActionButtons";

const useQuestionListStyles = makeStyles(() =>
    createStyles({
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
        listItemEdit: {
            backgroundColor: KnowitColors.darkBrown,
            padding: "16px",
            borderRadius: "16px",
            marginBottom: "10px",
            flexWrap: "wrap",
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
        button: {
            color: KnowitColors.darkBrown,
            marginLeft: "16px",
            "& span": {
                justifyContent: "center",
            },
        },
        listItemEditText: {
            color: KnowitColors.darkBrown,
            "& span": {
                fontWeight: "bold",
            },
        },
        actions: {
            display: "flex",
            alignItems: "center",
        },
        textField: {
            marginBottom: "16px",
            "& input": {
                color: KnowitColors.white,
            },
            "& textarea": {
                color: KnowitColors.white,
            },
            "& label": {
                color: KnowitColors.white,
            },
            "& fieldset": {
                color: KnowitColors.white,
                border: "2px solid #F3C8BA",
                borderRadius: "15px",
                transition: "border 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            },
        },
    })
);

const QuestionListItem = ({
    question: q,
    index: ind,
    moveQuestion,
    saveQuestion,
    enableUpdates,
    questions,
}: any) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [topic, setTopic] = useState<String>(q.topic);
    const [text, setText] = useState<String>(q.text);
    const [categoryID, setCategoryID] = useState<String>(q.categoryID);
    const classes = useQuestionListStyles();

    const onSave = async () => {
        try {
            await saveQuestion(q, topic, text, categoryID);
            setEditMode(false);
        } catch (e) {}
    };

    const onCancel = () => {
        setTopic(q.topic);
        setText(q.text);
        setCategoryID(q.categoryID);
        setEditMode(false);
    };

    return editMode ? (
        <ListItem className={classes.listItemEdit}>
            <ListItemText
                primary={
                    <>
                        <TextField
                            autoFocus
                            fullWidth
                            label="Emne"
                            variant="outlined"
                            value={topic}
                            className={classes.textField}
                            onChange={(e: any) => setTopic(e.target.value)}
                            error={topic.length === 0}
                            helperText={
                                topic.length === 0 &&
                                "Emnet kan ikke være tomt."
                            }
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            rowsMax={6}
                            label="Beskrivelse"
                            variant="outlined"
                            value={text}
                            className={classes.textField}
                            onChange={(e: any) => setText(e.target.value)}
                        />
                    </>
                }
                className={classes.listItemEditText}
            />
            <EditActionButtons onSave={onSave} onCancel={onCancel} />
        </ListItem>
    ) : (
        <ListItem key={q.id} className={classes.listItem}>
            <ListItemText
                primary={
                    <>
                        {ind + 1}. {q.topic}
                        <div className={classes.actions}>
                            <IconButton
                                onClick={() => setEditMode(true)}
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
                                    onClick={() => moveQuestion(q, 1)}
                                    className={classes.button}
                                    disabled={!enableUpdates || ind === 0}
                                >
                                    <KeyboardArrowUpIcon fontSize="small" />
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() => moveQuestion(q, -1)}
                                    className={classes.button}
                                    disabled={
                                        !enableUpdates ||
                                        ind === questions.length - 1
                                    }
                                >
                                    <KeyboardArrowDownIcon fontSize="small" />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </>
                }
                secondary={q.text}
                className={classes.listItemText}
            />
        </ListItem>
    );
};

export default QuestionListItem;
