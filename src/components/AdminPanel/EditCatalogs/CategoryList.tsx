import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";

import {
    listCategoriesByFormDefinitionID,
    updateCategoryIndex,
    updateCategoryTextAndDescription,
    deleteCategory as deleteCategoryApi,
} from "../catalogApi";
import useApiGet from "../useApiGet";
import { Category } from "../../../API";
import { compareByIndex } from "../helpers";
import CategoryListItem from "./CategoryListItem";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

const CategoryList = ({ formDefinitionID, formDefinitionLabel }: any) => {
    const history = useHistory();
    const memoizedCallback = useCallback(
        () => listCategoriesByFormDefinitionID(formDefinitionID),
        [formDefinitionID]
    );
    const [enableUpdates, setEnableUpdates] = useState<boolean>(true);

    const { result: categories, error, loading, refresh } = useApiGet({
        getFn: memoizedCallback,
        cmpFn: compareByIndex,
    });

    const [
        showDeleteCategoryDialog,
        setShowDeleteCategoryDialog,
    ] = useState<boolean>(false);
    const [categoryToDelete, setCategoryToDelete] = useState<any>();
    const deleteCategory = (category: any) => {
        setShowDeleteCategoryDialog(true);
        setCategoryToDelete(category);
    };
    const deleteCategoryConfirm = async () => {
        await deleteCategoryApi(categoryToDelete.id);
        setShowDeleteCategoryDialog(false);
        refresh();
    };

    const moveCategory = async (category: any, direction: number) => {
        setEnableUpdates(false);

        const me = category;
        const swapWith = categories.find(
            (c) => c.index === me.index - direction
        );
        await updateCategoryIndex(me, swapWith.index);
        await updateCategoryIndex(swapWith, me.index);

        setEnableUpdates(true);
        refresh();
    };

    const saveCategory = async (
        category: any,
        text: string,
        description: string
    ) => {
        await updateCategoryTextAndDescription(category, text, description);
        refresh();
    };

    return (
        <>
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && categories && (
                <List>
                    {categories.map((c: Category, ind: number) => {
                        const editPathName = `/edit/${formDefinitionID}/${c.id}`;
                        const editSearch = `?formDefinitionLabel=${formDefinitionLabel}&label=${c.text}`;

                        return (
                            <CategoryListItem
                                key={c.id}
                                onClick={() =>
                                    history.push(`${editPathName}${editSearch}`)
                                }
                                category={c}
                                index={ind}
                                moveCategory={moveCategory}
                                saveCategory={saveCategory}
                                deleteCategory={deleteCategory}
                                enableUpdates={enableUpdates}
                                categories={categories}
                            />
                        );
                    })}
                </List>
            )}
            {categoryToDelete && (
                <DeleteCategoryDialog
                    open={showDeleteCategoryDialog}
                    onCancel={() => setShowDeleteCategoryDialog(false)}
                    onExited={() => setCategoryToDelete(null)}
                    onConfirm={deleteCategoryConfirm}
                    category={categoryToDelete}
                />
            )}
        </>
    );
};

export default CategoryList;
