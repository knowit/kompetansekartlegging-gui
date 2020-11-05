import {API, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api";

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

    if(variables.input.length === 0) throw new Error("Array size must be more than 0 in a batch mutation");

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
    let strArr: string[] = [];
    for(let i = 0; i < str.length; i+=30){
        strArr.push(str.slice(i, i+30));
    }
    if(overflow){
        // console.log(str.replace(/(.*?\s.*?\s)/g, '$1'+'\n'));
        // return str.replace(/(.*?\s.*?\s)/g, '$1'+'\n');
    }
    // return str.length > length ? str.substring(0, (length > 3 ? length - 3 : length)) + "..." : str;
    console.log(str);
    console.log(str.match(/(?:\s*)(.{1,length})(?:\s+|\s*$)/g));
    return str.match(/(?:\s*)(.{1,length})(?:\s+|\s*$)/g) || [];
};

// export const fillStringToLimit = (str: string, limit: number, char: string = " "): string => {
//     if(str.length >= limit) return str;

// };



// String.prototype.trimEllip = function (length) {
//     return this.length > length ? this.substring(0, length) + "..." : this;
//   }
