import boto3
import argparse
import json

from add_api_key_to_apigateway import add_api_key_to_apigateway
from add_api_key_to_dynamodb import add_api_key_to_dynamodb

parser = argparse.ArgumentParser(description='Transfer api-keys')
parser.add_argument('source_iam_user', help='IAM user of the source of the API KEYS')
parser.add_argument('destination_iam_user', help='IAM user of the destination of the API KEYS')


args = parser.parse_args()

source_iam_user = args.source_iam_user
destination_iam_user = args.destination_iam_user


source_session = boto3.Session(profile_name=source_iam_user)
source_client = source_session.client('apigateway')

destination_session = boto3.Session(profile_name=destination_iam_user)
destination_client = destination_session.client('apigateway')

api_key_items = source_client.get_api_keys(limit = 100, includeValues=True)['items']

for api_key_item in api_key_items:

    api_tags = api_key_item['tags'] if 'tags' in api_key_item else {}

    with open('parameters.json') as parameters_file:
        parameters = json.load(parameters_file)

    destination_graphql_api_id = parameters['destination_graphql_api_id']
    destination_env = parameters['destination_env']
    
    add_api_key_to_apigateway(destination_iam_user, api_key_item['value'], api_key_item['name'], api_tags)
    add_api_key_to_dynamodb('knowitobjectnet', api_key_item['value'], destination_iam_user, destination_graphql_api_id, destination_env)