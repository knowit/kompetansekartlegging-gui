import boto3
import json


source_iam_user = 'knowit_sandbox'

source_client = boto3.Session(profile_name=source_iam_user).client('cognito-idp')


response = source_client.admin_get_user(
    UserPoolId='eu-central-1_Rt7YbbtG1',
    Username='Google_114958085374050479619'
)

userAttributes = [item for item in response['UserAttributes'] if item['Name'] != 'sub' and item['Name'] != 'identities']
email = [item for item in response['UserAttributes'] if item['Name'] == 'email'][0]['Value']

source_client.admin_create_user(
    UserPoolId='eu-central-1_WgAOXMxAe',
    Username=email,
    UserAttributes=userAttributes
)