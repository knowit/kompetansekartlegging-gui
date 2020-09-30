import {API, graphqlOperation} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api";

export const callGraphQL = async <T>(query: any, variales?: {} | undefined): Promise<GraphQLResult<T>> => {
    return (await API.graphql(graphqlOperation(query, variales))) as GraphQLResult<T>;
};

