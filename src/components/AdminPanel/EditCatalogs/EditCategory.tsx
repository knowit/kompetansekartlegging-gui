import React, { useCallback } from "react";
import { useParams } from "react-router-dom";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

import { listCategoriesByFormDefinitionID } from "../catalogApi";
import useApiGet from "../useApiGet";
import { compareByIndex } from "../helpers";

import QuestionList from "./QuestionList";
import RouterBreadcrumbs from "./Breadcrumbs";
import useQuery from "./useQuery";
import commonStyles from "../common.module.css";

const useStyles = makeStyles(() =>
    createStyles({
        questionList: {
            marginLeft: "0",
        },
    })
);

const EditCategory = () => {
    const classes = useStyles();
    const { id, formDefinitionID } = useParams<Record<string, string>>();

    const memoizedCallback = useCallback(
        () => listCategoriesByFormDefinitionID(formDefinitionID),
        [formDefinitionID]
    );
    const { result: categories, error, loading } = useApiGet({
        getFn: memoizedCallback,
        refreshCounter: 0,
        cmpFn: compareByIndex,
    });

    const query = useQuery();
    const formDefinitionLabel = query.get("formDefinitionLabel");
    const label = query.get("label");
    const breadCrumbs = {
        [`/edit/${formDefinitionID}`]: formDefinitionLabel,
        [`/edit/${formDefinitionID}/${id}`]: label,
    };
    const breadCrumbsUrlOverrides = {
        "/edit": `/edit/${formDefinitionID}?label=${formDefinitionLabel}`,
        [`/edit/${formDefinitionID}`]: `/edit/${formDefinitionID}?label=${formDefinitionLabel}`,
    };

    return (
        <>
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && categories && (
                <Container maxWidth="lg" className={commonStyles.container}>
                    <RouterBreadcrumbs
                        extraCrumbsMap={breadCrumbs}
                        urlOverrides={breadCrumbsUrlOverrides}
                    />
                    <Container maxWidth="sm" className={classes.questionList}>
                        <QuestionList
                            id={id}
                            categories={categories}
                            formDefinitionID={formDefinitionID}
                            formDefinitionLabel={formDefinitionLabel}
                        />
                    </Container>
                </Container>
            )}
        </>
    );
};

export default EditCategory;
