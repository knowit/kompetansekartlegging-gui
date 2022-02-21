import boto3
import time
import random
import string
import datetime

iam_user = 'xxxxxxxxxxxxxxx'
session = boto3.Session(profile_name=iam_user)
cognito_client = session.client('cognito-idp')
dynamodb_client = session.resource('dynamodb')

userPool_ID = 'xxxxxxxxxxxxxxxxxx'
amplify_environment = 'xxxxxxxxxxxx'
graphql_api_id = 'xxxxxxxxxxxxxxxx'


organization_ID = 'testorganization'

# Create test organization in dynamodb

table_name = 'Organization'
full_table_name = table_name + '-' + graphql_api_id + '-' + amplify_environment


table = dynamodb_client.Table(full_table_name)

id = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10)) + str(int(time.time()*1000))

iso_time = datetime.datetime.now().isoformat() + 'z'

table.put_item(
    Item={
        'id': organization_ID,
        'orgname': 'Test Organization',
        'identifierAttribute': 'test',
        'createdAt': iso_time,
        'updatedAt': iso_time
    }
)


# creating test user pool groups

userpool_groups = [organization_ID, organization_ID + '0admin', organization_ID +'0groupLeader']
precedence = 1000
'''
for userpool_group in userpool_groups:

    cognito_client.create_group(
        GroupName=userpool_group,
        UserPoolId=userPool_ID,
        Precedence=precedence
    )
    precedence += 1    
'''


# creating test users

user_names = ['testbruker1@randomtestmail.no', 'testbruker2@randomtestmail.no']
names = ['Test Testsen 1', 'Test Testsen 2']
passwords = ['xxxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxx']


for user_name, name, password in zip(user_names, names, passwords):
    cognito_client.admin_create_user(
        UserPoolId=userPool_ID,
        Username=user_name,
        UserAttributes=[
            {
                'Name': 'custom:OrganizationID',
                'Value': organization_ID
            },
            {
                'Name': 'email',
                'Value': user_name
            },
            {
                'Name': 'picture',
                'Value': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Person_icon_BLACK-01.svg'
            }
        ],
        MessageAction='SUPPRESS'
    )

    cognito_client.admin_set_user_password(
        UserPoolId=userPool_ID,
        Username=user_name,
        Password=password,
        Permanent=True
    )


cognito_client.admin_add_user_to_group(
    UserPoolId=userPool_ID,
    Username = user_names[0],
    GroupName = userpool_groups[0]
)

cognito_client.admin_add_user_to_group(
    UserPoolId=userPool_ID,
    Username = user_names[0],
    GroupName = userpool_groups[1]
)   

cognito_client.admin_add_user_to_group(
    UserPoolId=userPool_ID,
    Username = user_names[1],
    GroupName = userpool_groups[0]
)