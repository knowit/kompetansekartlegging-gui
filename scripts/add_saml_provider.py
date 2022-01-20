import boto3


import json


with open('saml_params.json') as parameters_file:
    parameters = json.load(parameters_file)

parameter_keys = ['metadata_url', 'iam_user', 'userpool_id', 'env']

if not all(key in parameters for key in parameter_keys):
    print(f"saml_params.json must contain the following keys: f{parameter_keys}")
    exit()

userpool_id = parameters['userpool_id']
metadata_url = parameters['metadata_url']
iam_user = parameters['iam_user']
env = parameters['env']

session = boto3.Session(iam_user)

cognito_client = boto3.client('cognito-idp')

response = client.create_identity_provider(
    UserPoolId=userpool_id,
    ProviderName='AzureAD',
    ProviderType='SAML',
    ProviderDetails={
        'MetaDataURL': metadata_url
    },
    AttributeMapping={
        'email': 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
        'name': 'http://schemas.microsoft.com/ws/2008/06/identity/claims/displayname',
        'nickname': 'http://schemas.microsoft.com/ws/2008/06/identity/claims/companyname' # TODO: Change to custom attribute or something with a better name
    }
)




