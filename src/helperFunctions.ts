import {API, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api";
import { UserFormList, UserFormWithAnswers } from "./types";
import * as customQueries from './graphql/custom-queries';

/*
    Used to call graphql queries and mutations.
    - Query input can be any query or mutation from queries.ts, mutations.ts or custom-queries.ts in the query folder.
    - Variables input is used to pass inputs to the query if its needed.
    
    Use a type to describe what structure you want the result to be. The return type is a Promise, so use (await).data
        to extract the data within.
*/
export const callGraphQL = async <T>(query: any, variables?: {} | undefined): Promise<GraphQLResult<T>> => {
    return (await API.graphql(graphqlOperation(query, variables))) as GraphQLResult<T>;
};

type SearchableItem = {
    createdAt: string
}

/*
    Get the last item in a array, based on the "createdAt" field. Used with results from graphql querries.
    
    Dont use this function anymore, it should be changed or removed because the query itself will grab the
        last item automaticly.
*/
export const getLastItem = <T extends SearchableItem>(itemsArray?:T[]) => {
    if(!itemsArray) return null;
    let sortedArray = itemsArray.sort((a,b) => (Date.parse(a.createdAt) > Date.parse(b.createdAt)) ? -1 : 1);
    return sortedArray[0];
}

/*
    Gets all userforms in the database. Returned as an array.
    Because graphql has a limit on how many items that can be querried at a time,
        the "nextToken" is used to redo the query again with a start offset on the index.
*/
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

/*
    Splits the incoming array into arrays of length 25.
    Used to prepear arrays for batch querries. A batch querry can do max 25 items at a time.
*/
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

const environmentIds = {
    master: "lrpwndrpizhebpe24dpd2cugwq-master",
    dev: "3hic5nngffevtfafcd62sdoece-dev",
    testback: "zxk54jobi5cpxgf7jvdw53glsq-testback"
}

//For now: anytime using a backend environment, or lacking environment variables, the return must be set manually
export const getEnvTableID = () => {
    return environmentIds.dev;
}

/*
    Do a batch call with a querry and input variables.
    Basicly splits the incoming array of inputs, and dose a batch call for every size 25 array
    
    This function will be changed in the future because of removing the env variable
*/
export const callBatchGraphQL = async <T>(query: any, variables: {input: any[]}, table:string): Promise<GraphQLResult<T>[]> => {
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

/*
    Rounds a number to a number of decimals.
    - ValueToRound: The number u need to round.
    - DecimalCount: The number of decimals u want in the result.
*/
export const roundDecimals = (valueToRound: number, decimalCount: number): number => {
    return Math.round(valueToRound * Math.pow(10, decimalCount)) / Math.pow(10, decimalCount);
};

/*
    Clamp a number between 2 numbers.
    - Value: The value to clamp.
    - Min: The lowest value the input value can be (return this if value < min).
    - Max (Optional): The highest value the input value can be (return this if value > max).
*/
export const clampNumber = (value: number, min: number, max?: number): number => {
    let newValue = value < min ? min : value;
    if(max) newValue = value > max ? max : value;
    // console.log(`v:${value}, min:${min}, max:${max}, new:${newValue}`);
    return newValue;
};

/*
    Limits a strings length, and replaces any extra characters with "...".
    - Str: Input string to limit.
    - Length: The max length of the string.
    - Overflow: True if you want to add lineshift instead of "..." at length.
    If overflow == true, use regex to place lineshift between words that would go over the length limit.
        This dose not work that great if there is words in the string longer than length.
*/
export const limitStringLength = (str: string, length: number, overflow: boolean = false): string[] => {
    if(length <= 0) return [str];
    if(overflow) return str.match(new RegExp("(?:\\s*)(.{1,"+ length +"})(?:\\s+|\\s*$)", "g")) || [];
    if(length <= 3) return ["..."]
    return [str.substring(0, length - 3) + "..."];
};

/**
 * Splits a long string into an array of shorter strings, with hyphens where "appropriate".
 * 
 * @param {string}  str          Input string.
 * @param {number}  maxLength    Maximum length of result strings.  
 */

export const wrapString = (str: string, maxLength: number): string[] => {
    let splitOnSpace = str.split(" ");
    let resultArray: string[] = [];
    for (let i = 0; i < splitOnSpace.length; i++ ) {
        let s = splitOnSpace[i];
        if (s.length > maxLength) {
            let head = s.slice(0, s.length/2);
            let tail = s.slice(s.length/2);
            resultArray.push(head + "-");
            resultArray.push(tail);
        } else {
            if (splitOnSpace.length > i + 1) {
                if (s.length + splitOnSpace[i + 1].length <= maxLength - 1) {
                    resultArray.push(s + " " + splitOnSpace[i + 1]);
                    i++;
                } else {
                    resultArray.push(s); 
                }
            } else {
                resultArray.push(s);
            }
        }
    }
    return resultArray;
};

/*
    Adds padding to all strings in the input array, used to make all strings a set length.
    - Str: Array with all strings to add padding to.
    - PaddLength: How long all strings sould end up with.
    - PadChar (optional): Character to use for adding padding (default is a space " ").
    
    This function should be changed to take a single string too, so you dont have to use
        a array of strings every time.
*/
export const addLeftPaddingToStringArray = (str: string[], padLength: number, padChar?: string): string[] => {
    return str.map((value) => value.padStart(padLength, padChar))
};


/*
    
*/
// let activePanels = {
//     Overview: true,
//     MyAnswers: false
// };

// export enum Panel {
//     Overview,
//     MyAnswers,
//     None
// };

// export const getActivePanel = (): Panel => {
//     if(activePanels.Overview) return Panel.Overview;
//     if(activePanels.MyAnswers) return Panel.MyAnswers;
//     return Panel.None;
// };

// export const setActivePanel = (panel: Panel): Panel => {
//     if(panel === Panel.Overview) {
//         activePanels.Overview = true;
//         activePanels.MyAnswers = false;
//     } else if(panel === Panel.MyAnswers){
//         activePanels.Overview = false;
//         activePanels.MyAnswers = true;
//     } else if(panel === Panel.None){
//         activePanels.Overview = false;
//         activePanels.MyAnswers = false;
//     }
//     return getActivePanel();
// };





