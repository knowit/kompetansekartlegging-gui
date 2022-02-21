from add_api_key_to_apigateway import add_api_key_to_apigateway
from add_api_key_to_dynamodb import add_api_key_to_dynamodb

import json
import argparse
import random
import string


def generate_api_key(): 
    return ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase +  string.digits) for _ in range(40))

def add_api_key(organization_ID, api_key_name, iam_user, graphql_api_id, env, api_key = None): 
    

    if api_key == None:
        api_key = generate_api_key()

    add_api_key_to_dynamodb(organization_ID, api_key, iam_user, graphql_api_id, env)
    add_api_key_to_apigateway(iam_user, api_key, api_key_name, {'organizationID': organization_ID})

    print('The api-key has the value:', api_key)


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='Add api_key to dynamodb')
    parser.add_argument('organization_ID', help='organizationID : This is a string which uniquely identifies the organization')
    parser.add_argument('api_key_name', help='api_key_name: Name of the API key')
    parser.add_argument('--apikey',
        help='API_Key: API_Key which can be used to access the api for the organization. If argument is not passed, a key will be generated. Key has to be atleast 20 characters long.')

    args = parser.parse_args()

    organization_ID = args.organization_ID
    api_key_name = args.api_key_name

    if args.apikey is None:
        api_key = generate_api_key()
    elif len(args.apikey) < 20:
        print('apikey has to be atleast 20 characters long!')
        exit()
    else:
        api_key = args.apikey

    with open('parameters.json') as parameters_file:
        parameters = json.load(parameters_file)

    destination_iam_user = parameters['destination_iam_user']
    destination_graphql_api_id = parameters['destination_graphql_api_id']
    destination_env = parameters['destination_env']

    add_api_key(organization_ID, api_key_name, destination_iam_user, destination_graphql_api_id, destination_env, api_key)