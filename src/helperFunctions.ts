import {API, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api";
import { UserFormList, UserFormWithAnswers } from "./types";
import * as customQueries from './graphql/custom-queries';


export const callGraphQL = async <T>(query: any, variables?: {} | undefined): Promise<GraphQLResult<T>> => {
    return (await API.graphql(graphqlOperation(query, variables))) as GraphQLResult<T>;
};

type SearchableItem = {
    createdAt: string
}

export const getLastItem = <T extends SearchableItem>(itemsArray?:T[]) => {
    if(!itemsArray) return null;
    let sortedArray = itemsArray.sort((a,b) => (Date.parse(a.createdAt) > Date.parse(b.createdAt)) ? -1 : 1);
    return sortedArray[0];
}

export const listUserForms = async () => {
    let nextToken: string | null = null;
    let combinedUserForm: UserFormWithAnswers[] = [];
    do {
        let userForms: UserFormList | undefined = (await callGraphQL<UserFormList>(customQueries.listUserFormsWithAnswers, {nextToken: nextToken})).data;
        if(userForms && userForms.listUserForms.items.length > 0){
            combinedUserForm = combinedUserForm.concat(userForms.listUserForms.items);
        }
        if(userForms) nextToken = userForms.listUserForms.nextToken;
    }while(nextToken); 
    
    return combinedUserForm;
};

const splitArray = <T>(array: T[]): T[][] => {
    if (array.length < 25) return [array];

    let splitArray = [];
    let currentCount = 0;
    while (currentCount < array.length) {
        let availableNumber = Math.min(array.length - currentCount, 25);
        splitArray.push(array.slice(currentCount, currentCount + availableNumber));
        currentCount += 25;
    }
    return splitArray;
}


//For now: anytime using a backend environment, or lacking environment variables, the return must be set manually
const getEnvTableID = () => {
    if(process.env.REACT_APP_ENV_TABLE_ID) return process.env.REACT_APP_ENV_TABLE_ID;
    else return "3hic5nngffevtfafcd62sdoece-dev";
}

export const callBatchGraphQL = async <T>(query: any, variables: {input: any[]}, table:string): Promise<GraphQLResult<T>[]> => {

    //if(process.env.REACT_APP_ENV_TABLE_ID) console.log(process.env.REACT_APP_ENV_TABLE_ID);
    //else console.log("No process.env.REACT_APP_ENV_TABLE_ID found");

    if(variables.input.length === 0) {
        console.error("Array size must be more than 0 in a batch mutation");
        return [];
    }

    let split = splitArray(variables.input);
    let returnValue = [];
    let envTableID = table + "-" + getEnvTableID();
    for (const element of split) {
        returnValue.push(await API.graphql(graphqlOperation(query, {input: element, env: {envID: envTableID}})) as GraphQLResult<T>);
    }
    return returnValue;
};

export const roundDecimals = (valueToRound: number, decimalCount: number): number => {
    return Math.round(valueToRound * Math.pow(10, decimalCount)) / Math.pow(10, decimalCount);
};

export const clampNumber = (value: number, min: number, max?: number): number => {
    let newValue = value < min ? min : value;
    if(max) newValue = value > max ? max : value;
    // console.log(`v:${value}, min:${min}, max:${max}, new:${newValue}`);
    return newValue;
};

export const limitStringLength = (str: string, length: number, overflow: boolean = false): string[] => {
    if(length <= 0) return [str];
    if(overflow) return str.match(new RegExp("(?:\\s*)(.{1,"+ length +"})(?:\\s+|\\s*$)", "g")) || [];
    if(length <= 3) return ["..."]
    return [str.substring(0, length - 3) + "..."];
};

export const addLeftPaddingToStringArray = (str: string[], padLength: number, padChar?: string): string[] => {
    return str.map((value) => value.padStart(padLength, padChar))
};
