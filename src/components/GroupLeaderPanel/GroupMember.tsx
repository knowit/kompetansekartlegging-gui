import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
    fetchLastFormDefinition,
    createQuestionAnswers,
    getUserAnswers,
    setFirstAnswers,
} from "../answersApi";
import { getAttribute } from "../AdminPanel/helpers";
import { Panel, UserAnswer, QuestionAnswer } from "../../types";
import { Overview } from "../cards/Overview";
import AnswerDiagram from "../AnswerDiagram";
import styles from "./GroupMember.module.css";

const voidFn = () => 1;

const useNavStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Nav = ({ categories, category, setCategory, name }: any) => {
    const classes = useNavStyles();

    return (
        <div className={styles.nav}>
            <FormControl className={classes.formControl}>
                <InputLabel>Kategori</InputLabel>
                <Select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                >
                    <MenuItem value="Oversikt">Oversikt</MenuItem>
                    {categories.map((c: any) => (
                        <MenuItem key={c} value={c}>
                            {c}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <h1 className={styles.navName}>{name}</h1>
        </div>
    );
};
const GroupMember = ({ members, userId, isMobile = false }: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);
    const [category, setCategory] = useState<string>("Oversikt");
    const [userAnswersLoaded, setUserAnswersLoaded] = useState(false);
    const [questionAnswers, setQuestionAnswers] = useState<
        Map<string, QuestionAnswer[]>
    >(new Map());
    const [, setAnswersBeforeSubmitted] = useState<
        Map<string, QuestionAnswer[]>
    >(new Map());
    const [, setUserAnswers] = useState<UserAnswer[]>([]);

    const member = members.find((m: any) => m.Username === userId);
    const name = getAttribute(member, "name");
    useEffect(() => {
        setCategory("Oversikt");
        const fn = async () => {
            setLoading(true);
            try {
                await fetchLastFormDefinition(
                    voidFn,
                    (formDef) => createQuestionAnswers(formDef, setCategories),
                    (formDef) =>
                        getUserAnswers(
                            formDef,
                            member,
                            setUserAnswers,
                            voidFn,
                            setUserAnswersLoaded,
                            voidFn,
                            voidFn,
                            voidFn,
                            isMobile
                        ),
                    (quAns, newUserAnswers) =>
                        setFirstAnswers(
                            quAns,
                            newUserAnswers,
                            setQuestionAnswers,
                            setAnswersBeforeSubmitted
                        )
                );
            } catch (e) {
                setError(e.toString());
            }
            setLoading(false);
        };
        fn();
    }, [userId, isMobile, member]);

    const isLoading = loading;
    const isError = error;

    return (
        <>
            {isError && <p>An error occured: {isError}</p>}
            {isLoading && <CircularProgress />}
            {!isError && !isLoading && questionAnswers && (
                <>
                    <Nav
                        categories={categories}
                        category={category}
                        setCategory={setCategory}
                        name={name}
                    />
                    {category === "Oversikt" ? (
                        <Overview
                            activePanel={Panel.Overview}
                            questionAnswers={questionAnswers}
                            categories={categories}
                            isMobile={isMobile}
                            userAnswersLoaded={userAnswersLoaded}
                        />
                    ) : (
                        <AnswerDiagram
                            activeCategory={category}
                            isMobile={isMobile}
                            questionAnswers={questionAnswers}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default GroupMember;
