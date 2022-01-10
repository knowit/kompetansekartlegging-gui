const { CognitoIdentityProviderClient, AdminAddUserToGroupCommand } = require("@aws-sdk/client-cognito-identity-provider");

const getGroupName = event => {


  const providerToGroup = {
    "Google": "orgobjectnet",
    "azureprovider": "orgother"
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

  const input = {
    UserPoolId: event["userPoolId"],
    Username: event["userName"],
    GroupName: groupName
  }

  const command = new AdminAddUserToGroupCommand(input);


  try{
    const response = await client.send(command);
    console.log('response', response);
  }catch(err){
    console.log('error',err);
  }finally{
    callback(null, event);
  }

};  