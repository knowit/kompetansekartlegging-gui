/* Amplify Params - DO NOT EDIT
	AUTH_KOMPETANSEKARTLEGGIND11D7CCE_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { CognitoIdentityProviderClient, ListUsersInGroupCommand } = require("@aws-sdk/client-cognito-identity-provider");
const REGION = process.env.REGION;
const ORGANIZATION_ID_ATTRIBUTE = "custom:organizationID";

exports.handler = async (event) => {
    const cognitoProvider = new CognitoIdentityProviderClient({region: REGION});
    const organizationID = event.user.attributes[ORGANIZATION_ID_ATTRIBUTE];
    
    const fetchGroupLeadersUsersInput = {
        GroupName: "groupLeader",
        UserPoolId: event.user.pool.userPoolId
    }
    let groupLeadersInOrg = [];

    const fetchGroupLeadersRequest = new ListUsersInGroupCommand(fetchGroupLeadersUsersInput);
    try {
        const organizationUsersResponse = await cognitoProvider.send(fetchGroupLeadersRequest);
        groupLeadersInOrg.push(...organizationUsersResponse.Users.filter(user => {
            let userOrganization;
            user.Attributes.forEach(attribute => {
                if (attribute.Name === ORGANIZATION_ID_ATTRIBUTE) {
                    userOrganization = attribute.Value;
                }
            })
            return userOrganization === organizationID
        }));
    }
    catch (error) {
        console.error(error);
    }

    groupLeadersInOrg = groupLeadersInOrg.map(user => {
        let attributes = {};
        user.Attributes.forEach(attribute => attributes[attribute.Name] = attribute.Value);
        let mappedUser = {
            attributes
        };
        Object.keys(user).forEach(key => {
            if (key === "Attributes") return;
            mappedUser[key] = user[key];
        });
        return mappedUser;
    });

    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify({groupLeaders: groupLeadersInOrg}),
    };
    return response;
};
