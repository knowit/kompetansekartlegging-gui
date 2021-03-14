import React from "react";
import { useParams } from "react-router-dom";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    const { id, formDefinitionId } = useParams<
        Record<string, string | undefined>
    >();
    const query = useQuery();
    const formDefinitionLabel = query.get("formDefinitionLabel");
    const breadCrumbs = {
        [`/edit/${formDefinitionId}`]: formDefinitionLabel,
    };
    const breadCrumbsUrlOverrides = {
        "/edit": `/edit/${formDefinitionId}?label=${formDefinitionLabel}`,
        [`/edit/${formDefinitionId}`]: `/edit/${formDefinitionId}?label=${formDefinitionLabel}`,
    };

    return (
        <Container maxWidth="lg" className={commonStyles.container}>
            <RouterBreadcrumbs
                extraCrumbsMap={breadCrumbs}
                urlOverrides={breadCrumbsUrlOverrides}
            />
            <Container maxWidth="md" className={classes.questionList}>
                <QuestionList
                    id={id}
                    formDefinitionID={id}
                    formDefinitionLabel={formDefinitionLabel}
                />
            </Container>
        </Container>
    );
};

export default EditCategory;
