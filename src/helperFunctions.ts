import {API, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api";

export const callGraphQL = async <T>(query: any, variales?: {} | undefined): Promise<GraphQLResult<T>> => {
    return (await API.graphql(graphqlOperation(query, variales))) as GraphQLResult<T>;
};

type SearchableItem = {
    createdAt:string
}

export const getLastItem = <T extends SearchableItem>(itemsArray?:T[]) => {
    if(!itemsArray) return null;
    let sortedArray = itemsArray.sort((a,b) => (Date.parse(a.createdAt) > Date.parse(b.createdAt)) ? -1 : 1);
    return sortedArray[0];
}

