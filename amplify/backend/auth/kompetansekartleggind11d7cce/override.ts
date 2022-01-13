import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyAuthCognitoStackTemplate) {
    
    const customAttribute = {
        "attributeDataType" : 'String',
        "developerOnlyAttribute" : false,
        "mutable" : true,
        "name" : 'OrganizationID',
        "required" : false
    };
     
    resources.userPool.schema = [customAttribute];
}
