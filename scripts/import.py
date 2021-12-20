import boto3
import os

sourceappid = '3hic5nngffevtfafcd62sdoece'
destinationappid = 'yyddd4muhbehvd33aad462lsom'
env = 'dev'

tablenames = ["User", "UserForm", "Category", "FormDefinition", "Group", "Question", "QuestionAnswer"]

clientsession = boto3.Session(profile_name='KompetanseDynamoReadOnly')
targetclientsession = boto3.Session(profile_name='EUCentralAmplify')

dynamoclient = clientsession.client('dynamodb')

dynamotargetclient = targetclientsession.client('dynamodb')
for tablename in tablenames:
    dynamopaginator = dynamoclient.get_paginator('scan')
    tabname=tablename + '-' + sourceappid + '-dev'
    targettabname=tablename + '-' + destinationappid + '-sandbox'
    dynamoresponse = dynamopaginator.paginate(
        TableName=tabname,
        Select='ALL_ATTRIBUTES',
        ReturnConsumedCapacity='NONE',
        ConsistentRead=True
    )
    for page in dynamoresponse:
        for item in page['Items']:
            dynamotargetclient.put_item(
                TableName=targettabname,
                Item=item
            )

