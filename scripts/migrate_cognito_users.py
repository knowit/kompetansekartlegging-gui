import boto3
import json

with open('migrate_parameters.json') as parameters_file:
    parameters = json.load(parameters_file)

parameter_keys = ['source_iam_user', 'destination_iam_user', 'destination_userpool_id', 'destination_env']

if not all(key in parameters for key in parameter_keys):
    print(f"parameters.json must contain the following keys: f{parameter_keys}")
    exit()

source_userpool_id = 'eu-central-1_znSOUo9KZ'
source_env = 'dev'
source_iam_user = parameters['source_iam_user']

destination_iam_user = parameters['destination_iam_user']
destination_userpool_id = parameters['destination_userpool_id']
destination_env = parameters['destination_env']

source_client_session = boto3.Session(profile_name=source_iam_user)
destination_client_session = boto3.Session(profile_name=destination_iam_user)

source_cognito_client = source_client_session.client('cognito-idp')
destination_cognito_client = destination_client_session.client('cognito-idp')

source_users = []
nextToken = None

response = source_cognito_client.list_users(
    UserPoolId=source_userpool_id,
)

for user in response["Users"]:
    user["Attributes"].append({"Name":"custom:OrganizationID", "Value": "knowitobjectnet"})
    destination_cognito_client.admin_create_user(
        UserPoolId=destination_userpool_id,
        Username=user["Username"],
        UserAttributes=user["Attributes"]
    )

if response["PaginationToken"]:
    nextToken = response["PaginationToken"]

while (nextToken):
    response = source_cognito_client.list_users(
        UserpoolId=source_userpool_id,
        PaginationToken=nextToken
    )
    if response["PaginationToken"]:
        nextToken = response["PaginationToken"]
    else:
        nextToken = None
        break