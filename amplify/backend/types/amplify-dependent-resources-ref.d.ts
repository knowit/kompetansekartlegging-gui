export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "kompetansekartleggind11d7cce": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "HostedUIDomain": "string",
            "OAuthMetadata": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string",
            "GoogleWebClient": "string"
        },
        "userPoolGroups": {
            "adminGroupRole": "string",
            "groupLeaderGroupRole": "string",
            "knowitobjectnetGroupRole": "string",
            "knowitsolutionsGroupRole": "string",
            "knowitobjectnet0groupLeaderGroupRole": "string",
            "knowitobjectnet0adminGroupRole": "string",
            "knowitsolutions0groupLeaderGroupRole": "string",
            "knowitsolutions0adminGroupRole": "string"
        }
    },
    "api": {
        "kompetansekartleggin": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "externalAPI": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "AdminQueries": {
            "RootUrl": "string",
            "ApiName": "string"
        }
    },
    "function": {
        "createUserformBatch": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "externalAPI": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "AdminQueries2bd53f73": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "kompetansekartleggind11d7ccePostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        },
        "FetchGroupLeaders": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "kompetansekartleggind11d7ccePreSignup": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    },
    "hosting": {
        "S3AndCloudFront": {
            "Region": "string",
            "HostingBucketName": "string",
            "WebsiteURL": "string",
            "S3BucketSecureURL": "string"
        }
    }
}