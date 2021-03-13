import React from "react";
import { useParams } from "react-router-dom";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import CategoryList from "./CategoryList";
import RouterBreadcrumbs from "./Breadcrumbs";
import useQuery from "./useQuery";
import commonStyles from "../common.module.css";

const useStyles = makeStyles(() =>
    createStyles({
        categoryList: {
            marginLeft: "0",
        },
    })
);

const EditCatalog = () => {
    const classes = useStyles();
    const { id } = useParams<Record<string, string | undefined>>();
    const query = useQuery();
    const label = query.get("label");
    const breadCrumbs = {
        [`/edit/${id}`]: label,
    };
    const breadCrumbsUrlOverrides = {
        "/edit": `/edit/${id}?label=${label}`,
    };

    return (
        <Container maxWidth="lg" className={commonStyles.container}>
            <RouterBreadcrumbs
                extraCrumbsMap={breadCrumbs}
                urlOverrides={breadCrumbsUrlOverrides}
            />
            <Container maxWidth="sm" className={classes.categoryList}>
                <CategoryList
                    formDefinitionID={id}
                    formDefinitionLabel={label}
                />
            </Container>
        </Container>
    );
};

export default EditCatalog;
