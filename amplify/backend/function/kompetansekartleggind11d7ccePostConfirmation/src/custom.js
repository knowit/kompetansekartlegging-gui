const { CognitoIdentityProviderClient, AdminAddUserToGroupCommand, AdminUpdateUserAttributesCommand } = require("@aws-sdk/client-cognito-identity-provider");

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

// Should probably be environment variables, but haven't figured how to fix it with amplify so far, without
// some hacky editing of the cloud-formation template
const OrganizationConstants = {
  TableName: 'Organization',
  IndexName: 'byIdentifierAttribute',
  IdentifierAttribute: 'identifierAttribute',
}


const isDeveloperLogin = event => {
  return event["request"]["userAttributes"]["identities"] === undefined
}

const getIdentifierValue = event => {
  const identities = JSON.parse(event["request"]["userAttributes"]["identities"]);
  const providerName = identities[0]["providerName"];
  return providerName;
};


const getOrganizationID = (identifierAttributeValue) => new Promise(async (resolve, reject) => {
  const params = {
    TableName: OrganizationConstants["TableName"]+'-'+process.env.API_KOMPETANSEKARTLEGGIN_GRAPHQLAPIIDOUTPUT+"-"+process.env.ENV,
    IndexName: OrganizationConstants["IndexName"],
    KeyConditionExpression: OrganizationConstants["IdentifierAttribute"] + " = :iA",
    ExpressionAttributeValues: { ":iA": identifierAttributeValue },
    ProjectionExpression: "id",
    Select: "SPECIFIC_ATTRIBUTES"
  }
  

  console.log(params);

  try{
    const data = await docClient.query(params).promise();
    console.log(data);
    if(data.Count >= 1){
      const organizationID = data['Items'][0]['id'];
      resolve(organizationID);
    }else{
      reject('Could not find any item with the the identifier attribute:', identifierAttributeValue)
    }
 
  } catch (err){
    reject(err);
  }

});

exports.handler = async (event, context, callback) => {

  if(isDeveloperLogin(event)){
    console.log('is development login');
    callback(null, event);
  }else{

    const client = new CognitoIdentityProviderClient({
      region: event["region"]
    });
    
    const identifierAttributeValue = getIdentifierValue(event);
    const organizationID = await getOrganizationID(identifierAttributeValue);
      
  
    const user_to_group_command = new AdminAddUserToGroupCommand({
        UserPoolId: event["userPoolId"],
        Username: event["userName"],
        GroupName: organizationID
      });
  
    const update_user_attribute_command = new AdminUpdateUserAttributesCommand({
        Username: event["userName"],
        UserPoolId: event["userPoolId"],
        UserAttributes: [{
          Name: "custom:OrganizationID", 
          Value: organizationID
        }]
    });
        
    try{
      const [response_user_group, response_custom_attribute] = await Promise.all(
        [client.send(user_to_group_command), client.send(update_user_attribute_command)]
      );
      console.log('response user_to_group', response_user_group);
      console.log('response custom_attribute', response_custom_attribute);
  
    }catch(err){
      console.log('error',err);
    }finally{
      callback(null, event);
    }

  }
};  