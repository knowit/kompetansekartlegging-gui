const { CognitoIdentityProviderClient, AdminAddUserToGroupCommand, AdminUpdateUserAttributesCommand } = require("@aws-sdk/client-cognito-identity-provider");

const getGroupName = event => {


  const providerToGroup = {
    "Google": "knowitobjectnet",
    "azureprovider": "knowitsolutions"
  };

  const identities = JSON.parse(event["request"]["userAttributes"]["identities"]);
  const providerName = identities[0]["providerName"];

  const groupName = providerToGroup[providerName];
  return groupName;
};


exports.handler = async (event, context, callback) => {


  const client = new CognitoIdentityProviderClient({
    region: event["region"]
  });


  groupName = getGroupName(event);

  const user_to_group_command = new AdminAddUserToGroupCommand({
      UserPoolId: event["userPoolId"],
      Username: event["userName"],
      GroupName: groupName
    });

  const update_user_attribute_command = new AdminUpdateUserAttributesCommand({
      Username: event["userName"],
      UserPoolId: event["userPoolId"],
      UserAttributes: [{
        Name: "custom:OrganizationID", 
        Value: groupName 
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

};  