# This is a script for importing table items from the dynamodb of kompetansekartlegging development environment
# into a personal sandbox environment. 

import boto3
import json


with open('parameters.json') as parameters_file:
    parameters = json.load(parameters_file)

parameter_keys = ['source_iam_user', 'source_graphql_api_id', 'source_env', 'destination_iam_user', 'destination_graphql_api_id', 'destination_env']

if not all(key in parameters for key in parameter_keys):
    print(f"parameters.json must contain the following keys: f{parameter_keys}")
    exit()

source_graphql_api_id = parameters['source_graphql_api_id']
source_env = parameters['source_env']
source_iam_user = parameters['source_iam_user']

destination_iam_user = parameters['destination_iam_user']
destination_graphql_api_id = parameters['destination_graphql_api_id']
destination_env = parameters['destination_env']


tablenames = ["User", "UserForm", "Category", "FormDefinition", "Group", "Question", "QuestionAnswer", "Organization", "APIKeyPermission"]

source_client_session = boto3.Session(profile_name=source_iam_user)
destination_client_session = boto3.Session(profile_name=destination_iam_user)

source_dynamo_client = source_client_session.client('dynamodb')
destination_dynamo_client = destination_client_session.client('dynamodb')

for tablename in tablenames:
    dynamopaginator = source_dynamo_client.get_paginator('scan')
    source_tabname = tablename + '-' + source_graphql_api_id + '-' + source_env
    destination_tabname = tablename + '-' + destination_graphql_api_id + '-' + destination_env
    dynamoresponse = dynamopaginator.paginate(
        TableName = source_tabname,
        Select = 'ALL_ATTRIBUTES',
        ReturnConsumedCapacity = 'NONE',
        ConsistentRead = True
    )
    for page in dynamoresponse:
        for item in page['Items']:
            destination_dynamo_client.put_item(
                TableName = destination_tabname,
                Item = item
            )