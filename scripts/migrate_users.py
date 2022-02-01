import boto3
import json


source_iam_user = 'EUCentralAmplify'
source_session = boto3.Session(profile_name=source_iam_user)
source_client = source_session.client('cognito-idp')

destination_session = source_session
destination_dynamo_client = destination_session.client('dynamodb')
destination_table_id = "7x5qk53ddffctd3gtqmtvbujiq" 
destination_env = "migrate"


response = source_client.admin_get_user(
    UserPoolId='eu-central-1_rni4BQPaR',
    Username='Google_104475194586241570827'
)

userGroups = source_client.admin_list_groups_for_user(
    UserPoolId='eu-central-1_rni4BQPaR',
    Username=response["Username"]
)

isGroupLeader = any([group["GroupName"] == "groupLeader" for group in userGroups["Groups"]])
if isGroupLeader:
    print("IsGroupLeader!")
isAdmin = any([group["GroupName"] == "groupLeader" for group in userGroups["Groups"]])
if isAdmin:
    print("IsAdmin!")

userName = response["Username"]
userAttributes = [item for item in response['UserAttributes'] if item['Name'] != 'sub' and item['Name'] != 'identities']
email = [item for item in response['UserAttributes'] if item['Name'] == 'email'][0]['Value']
userAttributes.append({"Name": "custom:OrganizationID", "Value": "knowitobjectnet"})

source_client.admin_create_user(
    UserPoolId='eu-central-1_r8n2aDwVQ',
    Username=email,
    MessageAction="SUPPRESS",
    UserAttributes=userAttributes
)

source_client.admin_add_user_to_group(
    UserPoolId='eu-central-1_r8n2aDwVQ',
    Username=email,
    GroupName="knowitobjectnet"
)

if isGroupLeader:
    source_client.admin_add_user_to_group(
        UserPoolId='eu-central-1_r8n2aDwVQ',
        Username=email,
        GroupName="knowitobjectnet0groupLeader"
    )
    
if isAdmin:
    source_client.admin_add_user_to_group(
        UserPoolId='eu-central-1_r8n2aDwVQ',
        Username=email,
        GroupName="knowitobjectnet0admin"
    )

tables = [
    {
        "name": "User",
        "ownerAttribute": ["id"]
    },
    {
        "name": "UserForm",
        "ownerAttribute": ["owner"]
    },
    {
        "name": "Category",
        "ownerAttribute": ["orgAdmins", "organizationID"]
    },
    {
        "name": "FormDefinition",
        "ownerAttribute": ["orgAdmins", "organizationID"]
    },
    {
        "name": "Group",
        "ownerAttribute": ["groupLeaderUsername"]
    },
    {
        "name": "Question",
        "ownerAttribute": ["orgAdmins", "organizationID"]
    },
    {
        "name": "QuestionAnswer",
        "ownerAttribute": ["owner"]
    }
]
userName='Google_104475194586241570827'
email='kristian.stamland@knowit.no'

for table in tables:
    dynamopaginator = destination_dynamo_client.get_paginator('scan')
    destination_tabname = table["name"] + '-' + destination_table_id + '-' + destination_env
    dynamoresponse = dynamopaginator.paginate(
        TableName = destination_tabname,
        Select = 'ALL_ATTRIBUTES',
        ReturnConsumedCapacity = 'NONE',
        ConsistentRead = True
    )
    for page in dynamoresponse:
        for item in page['Items']:
            updateItem = False
            for tableItem in table["ownerAttribute"]:
                if item[tableItem]["S"] == userName:
                    item[tableItem] = { "S": email }
                    updateItem = True
            if updateItem:
                destination_dynamo_client.put_item(
                    TableName = destination_tabname,
                    Item = item
                ) #TODO: Update DynamoDB so that username = email instead of Gooogle_xxxx