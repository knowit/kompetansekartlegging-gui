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

export const callBatchGraphQL = async <T>(query: any, variables: {input: any[], env:{envID:String}}): Promise<GraphQLResult<T>[]> => {
    if(variables.input.length === 0) throw new Error("Array size must be more than 0 in a batch mutation");

    let split = splitArray(variables.input);
    let returnValue = [];
    for (const element of split) {
        returnValue.push(await API.graphql(graphqlOperation(query, {input: element, env: variables.env})) as GraphQLResult<T>);
    }
    return returnValue;
};