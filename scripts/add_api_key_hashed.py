import boto3
import json
from hashlib import sha256
import string
import random


with open('parameters.json') as parameters_file:
    parameters = json.load(parameters_file)


parameter_keys = ['destination_iam_user', 'destination_graphql_api_id', 'destination_env']


destination_iam_user = parameters['destination_iam_user']
destination_graphql_api_id = parameters['destination_graphql_api_id']
destination_env = parameters['destination_env']


table_name = 'APIKeyPermission'

destination_client_session = boto3.Session(profile_name=destination_iam_user)

destination_dynamo_client = destination_client_session.resource('dynamodb')

full_table_name = table_name + '-' + destination_graphql_api_id + '-' + destination_env

table = destination_dynamo_client.Table(full_table_name)


organization_id = 'knowitsolutions'
api_key = 'FIrEpJPxEG6UzHBYyXEsG5tIUENlw7yj1aWagLFH'
api_key_hashed = sha256(api_key.encode('utf-8')).hexdigest()

id = api_key_hashed + ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))

table.put_item(
    Item={
        "id": id,
        "APIKeyHashed": api_key_hashed,
        "organizationID": organization_id
    }
)