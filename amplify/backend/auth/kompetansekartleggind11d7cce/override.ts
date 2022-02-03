import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyAuthCognitoStackTemplate) {
    
    const organizationID = {
        "attributeDataType" : 'String',
        "developerOnlyAttribute" : false,
        "mutable" : true,
        "name" : 'OrganizationID',
        "required" : false
    };
    const company = {
        "attributeDataType" : 'String',
        "developerOnlyAttribute" : false,
        "mutable" : true,
        "name" : 'company',
        "required" : false
    };
    resources.userPool.schema = [organizationID, company];
}
