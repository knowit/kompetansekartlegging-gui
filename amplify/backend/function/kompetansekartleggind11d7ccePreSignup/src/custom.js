const CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider')

const cognitoIdp = new CognitoIdentityServiceProvider()
const getUserByEmail = async (userPoolId, email) => {
 const params = {
   UserPoolId: userPoolId,
   Filter: `email = "${email}"`
 }
 return cognitoIdp.listUsers(params).promise()
}

const linkProviderToUser = async (username, userPoolId, providerName, providerUserId) => {
  const params = {
    DestinationUser: {
      ProviderAttributeValue: username,
      ProviderName: 'Cognito'
    },
    SourceUser: {
      ProviderAttributeName: 'Cognito_Subject',
      ProviderAttributeValue: providerUserId,
      ProviderName: providerName
    },
    UserPoolId: userPoolId
  }
  const result = await (new Promise((resolve, reject) => {
    cognitoIdp.adminLinkProviderForUser(params, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data)
    })
  }))
 
  return result
 }

exports.handler = async (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  console.log("PreSignUpTriggered", event)
  if (event.triggerSource === 'PreSignUp_ExternalProvider') {
    const userRs = await getUserByEmail(event.userPoolId, event.request.userAttributes.email)
    if (userRs && userRs.Users.length > 0) {
      const [ providerName, providerUserId ] = event.userName.split('_') // event userName example: "Facebook_12324325436"
      await linkProviderToUser(userRs.Users[0].Username, event.userPoolId, providerName, providerUserId)
    } else {
      attributes = [];
      Object.keys(event.request.userAttributes).forEach(key => {
        if (key === "identities" || key === "sub" || key.includes("cognito:")) return;
        attributes.push({"Name": key, "Value": event.request.userAttributes[key]});
      })
      if (event.userName != event.request.userAttributes.email){
        console.log("Creating new Cognito User Pool user", attributes)
        console.log(await new Promise((resolve, reject) => {
          cognitoIdp.adminCreateUser({
            MessageAction: "SUPPRESS",
            Username: event.request.userAttributes.email,
            UserAttributes: attributes,
            UserPoolId: event.userPoolId
          }, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          })
        })
        );
        const [ providerName, providerUserId ] = event.userName.split('_');
        await linkProviderToUser(event.request.userAttributes.email, event.userPoolId, providerName, providerUserId);
      } else {
        console.log('user not found, added new cognito user to userPool.');
      }
    }
 
  }

  callback(null, event);
};
