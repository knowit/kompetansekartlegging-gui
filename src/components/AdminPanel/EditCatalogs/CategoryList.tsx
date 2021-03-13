import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import {
    listCategoriesByFormDefinitionID,
    updateCategoryIndex,
} from "../catalogApi";
import useApiGet from "../useApiGet";
import { KnowitColors } from "../../../styles";
import { Category } from "../../../API";
import { compareByIndex } from "../helpers";

const useCategoryListStyles = makeStyles(() =>
    createStyles({
        button: {
            color: KnowitColors.darkBrown,
            marginLeft: "16px",
        },
        // orderButton: {
        //     marginLeft: "16px",
        //     color: "white",
        // },
        listItem: {
            transition: "150ms",
            cursor: "pointer",
            backgroundColor: KnowitColors.beige,
            padding: "16px",
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
            },
        },
        actions: {
            display: "flex",
            alignItems: "center",
        },
    })
);

const CategoryList = ({ formDefinitionID, formDefinitionLabel }: any) => {
    const history = useHistory();
    const classes = useCategoryListStyles();
    const memoizedCallback = useCallback(
        () => listCategoriesByFormDefinitionID(formDefinitionID),
        [formDefinitionID]
    );
    const [enableUpdates, setEnableUpdates] = useState<boolean>(true);

    const [dummy, setDummy] = useState(0);
    const { result: categories, error, loading } = useApiGet({
        getFn: memoizedCallback,
        refreshCounter: dummy,
        cmpFn: compareByIndex,
    });

    const moveCategory = async (category: any, direction: number) => {
        setEnableUpdates(false);

        const me = category;
        const swapWith = categories.find(
            (c) => c.index === me.index - direction
        );
        await updateCategoryIndex(me, swapWith.index);
        await updateCategoryIndex(swapWith, me.index);

        setDummy((dummy) => dummy + 1);
        setEnableUpdates(true);
    };

    return (
        <>
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && categories && (
                <List>
                    {categories.map((c: Category, ind: number) => {
                        const editPathName = `/edit/${formDefinitionID}/${c.id}`;
                        const editSearch = `?formDefinitionLabel=${formDefinitionLabel}`;

                        return (
                            <ListItem
                                key={c.id}
                                className={classes.listItem}
                                onClick={() =>
                                    history.push(`${editPathName}${editSearch}`)
                                }
                            >
                                <ListItemText
                                    primary={`${ind + 1}. ${c.text}`}
                                    className={classes.listItemText}
                                />
                                <ListItemSecondaryAction
                                    className={classes.actions}
                                >
                                    <Link
                                        to={{
                                            pathname: editPathName,
                                            search: editSearch,
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => 1}
                                            className={classes.button}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
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
                                            onClick={() => moveCategory(c, 1)}
                                            className={classes.button}
                                            disabled={
                                                !enableUpdates || ind === 0
                                            }
                                        >
                                            <KeyboardArrowUpIcon fontSize="small" />
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={() => moveCategory(c, -1)}
                                            className={classes.button}
                                            disabled={
                                                !enableUpdates ||
                                                ind === categories.length - 1
                                            }
                                        >
                                            <KeyboardArrowDownIcon fontSize="small" />
                                        </Button>
                                    </ButtonGroup>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </>
    );
};

export default CategoryList;
