import boto3
import os

sourceappid = '3hic5nngffevtfafcd62sdoece'
destinationappid = 'covu22hn6fgf5jdsw67hhugyty'
tablename = 'UserForm'
env = 'dev'

clientsession = boto3.Session(profile_name='kompetanse')
targetclientsession = boto3.Session(profile_name='sandbox')

dynamoclient = clientsession.client('dynamodb')

dynamotargetclient = targetclientsession.client('dynamodb')

dynamopaginator = dynamoclient.get_paginator('scan')
tabname=tablename + '-' + sourceappid + '-dev'
targettabname=tablename + '-' + destinationappid + '-dev'
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

