import { v4 as uuidv4 } from "uuid";

import { callGraphQL } from "../../helperFunctions";
import {
    CategoriesByFormDefinitionQuery,
    Category,
    FormDefinition,
    ListFormDefinitionsQuery,
    UpdateCategoryMutation,
} from "../../API";
import {
    categoriesByFormDefinition,
    listFormDefinitions,
} from "../../graphql/queries";
import {
    updateCategory as updateCategoryGq
} from "../../graphql/mutations";
import { ApiResponse } from "./adminApi";

const listAllFormDefinitions = async (): Promise<
    ApiResponse<FormDefinition[]>
> => {
    try {
        const gq = await callGraphQL<ListFormDefinitionsQuery>(
            listFormDefinitions
        );
        const els = gq?.data?.listFormDefinitions?.items?.map(
            (el) =>
                ({
                    id: el?.id,
                    label: el?.label,
                    createdAt: el?.createdAt,
                    updatedAt: el?.updatedAt,
                    sortKeyConstant: el?.sortKeyConstant,
                } as FormDefinition)
        );

        return { result: els || [] };
    } catch (e) {
        return { error: `Could not get a list of all form definitions.` };
    }
};

const listCategoriesByFormDefinitionID = async (
    formDefinitionID: string
): Promise<ApiResponse<Category[]>> => {
    try {
        const gq = await callGraphQL<CategoriesByFormDefinitionQuery>(
            categoriesByFormDefinition,
            {
                formDefinitionID,
            }
        );
        const els = gq?.data?.categoriesByFormDefinition?.items?.map(
            (el) =>
                ({
                    id: el?.id,
                    description: el?.description,
                    formDefinitionID: el?.formDefinitionID,
                    text: el?.text,
                    index: el?.index,
                    createdAt: el?.createdAt,
                    updatedAt: el?.updatedAt,
                } as Category)
        );

        return { result: els || [] };
    } catch (e) {
        return {
            error: `Could not get a list of categories for form definition id '${formDefinitionID}'.`,
        };
    }
};

const updateCategory = async (
    id: string,
    vars: any
): Promise<ApiResponse<Category>> => {
    try {
        const input = {
            id, ...vars
        }
        const gq = await callGraphQL<UpdateCategoryMutation>(updateCategoryGq, {
            input,
        });
        const el = gq?.data?.updateCategory as Category;
        return { result: el || null };
    } catch (e) {
        return {
            error: `Could not update category '${id}'.`,
        };
    }
};

const updateCategoryIndex = async (category: any, index: number) => {
    await updateCategory(category.id, { index });
};

export {
    listAllFormDefinitions,
    listCategoriesByFormDefinitionID,
    updateCategoryIndex,
};
