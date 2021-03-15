import { v4 as uuidv4 } from "uuid";

import { callGraphQL } from "../../helperFunctions";
import {
    CategoriesByFormDefinitionQuery,
    Category,
    DeleteFormDefinitionMutation,
    FormDefinition,
    ListFormDefinitionsQuery,
    Question,
    QuestionsByCategoryQuery,
    UpdateCategoryMutation,
    UpdateFormDefinitionMutation,
    UpdateQuestionMutation,
} from "../../API";
import {
    categoriesByFormDefinition,
    listFormDefinitions,
    questionsByCategory,
} from "../../graphql/queries";
import {
    updateCategory as updateCategoryGq,
    updateQuestion as updateQuestionGq,
    updateFormDefinition as updateFormDefinitionGq,
    deleteFormDefinition as deleteFormDefinitionGq,
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

const listQuestionsByCategoryID = async (
    categoryID: string
): Promise<ApiResponse<Question[]>> => {
    try {
        const gq = await callGraphQL<QuestionsByCategoryQuery>(
            questionsByCategory,
            {
                categoryID,
            }
        );
        const els = gq?.data?.questionsByCategory?.items?.map(
            (el) =>
                ({
                    id: el?.id,
                    text: el?.text,
                    topic: el?.topic,
                    formDefinitionID: el?.formDefinitionID,
                    categoryID: el?.categoryID,
                    index: el?.index,
                    createdAt: el?.createdAt,
                    updatedAt: el?.updatedAt,
                } as Question)
        );

        return { result: els || [] };
    } catch (e) {
        return {
            error: `Could not get a list of questions for category id '${categoryID}'.`,
        };
    }
};

const updateCategory = async (
    id: string,
    vars: any
): Promise<ApiResponse<Category>> => {
    try {
        const input = {
            id,
            ...vars,
        };
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

const updateCategoryTextAndDescription = async (
    category: any,
    text: string,
    description: string
) => {
    await updateCategory(category.id, { text, description });
};

const updateQuestion = async (
    id: string,
    vars: any
): Promise<ApiResponse<Question>> => {
    try {
        const input = {
            id,
            ...vars,
        };
        const gq = await callGraphQL<UpdateQuestionMutation>(updateQuestionGq, {
            input,
        });
        const el = gq?.data?.updateQuestion as Question;
        return { result: el || null };
    } catch (e) {
        return {
            error: `Could not update question '${id}'.`,
        };
    }
};

const updateQuestionIndex = async (question: any, index: number) => {
    await updateQuestion(question.id, { index });
};

const updateQuestionTextTopicAndCategory = async (
    question: any,
    topic: string,
    text: string,
    categoryID: string
) => {
    await updateQuestion(question.id, { topic, text, categoryID });
};

const updateFormDefinition = async (
    id: string,
    vars: any
): Promise<ApiResponse<FormDefinition>> => {
    try {
        const input = {
            id,
            ...vars,
        };
        const gq = await callGraphQL<UpdateFormDefinitionMutation>(updateFormDefinitionGq, {
            input,
        });
        const el = gq?.data?.updateFormDefinition as FormDefinition;
        return { result: el || null };
    } catch (e) {
        return {
            error: `Could not update form definition '${id}'.`,
        };
    }
};

const updateFormDefinitionCreatedAt = async (formDefinition: any, createdAt: string) => {
    await updateFormDefinition(formDefinition.id, { createdAt });
};

const deleteFormDefinition = async (
    id: string,
): Promise<ApiResponse<null>> => {
    try {
        const input = {
            id,
        };
        await callGraphQL<DeleteFormDefinitionMutation>(deleteFormDefinitionGq, {
            input,
        });
        return { result: null };
    } catch (e) {
        return {
            error: `Could not delete form definition '${id}'.`,
        };
    }
};

export {
    listAllFormDefinitions,
    listCategoriesByFormDefinitionID,
    updateCategoryIndex,
    listQuestionsByCategoryID,
    updateQuestionIndex,
    updateCategoryTextAndDescription,
    updateQuestionTextTopicAndCategory,
    updateFormDefinitionCreatedAt,
    deleteFormDefinition
};
