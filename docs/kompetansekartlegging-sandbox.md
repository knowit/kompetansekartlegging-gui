## Creating a sandbox environment

There are a couple of requirements before setting up a sandbox environment. You need to have downloaded and installed the Amplify CLI, [link](https://docs.amplify.aws/cli/start/install/), and have configured it with access to the sandbox account.

The following steps guides you through the set-up process of the sandbox environment. 

### Step one: Initilizing amplify
Run
```
amplify init
```
The setup will ask you for an environment name. Enter a new environment name like "username-sandbox", as the sandbox enviornment should be unique to the user.

During set-up, you will be asked about a Google Web Client ID. This can be created by following the steps in [this tutorial](https://aws.amazon.com/premiumsupport/knowledge-center/cognito-google-social-identity-provider/). Ignore the steps about setting up Authorized javascript origins and Authorized redirect urls for now, this comes later. 


### Step two: Pushing amplify 
```
amplify push
```
This command builds the project and pushes the amplify application to the cloud. Once this step is complete, it is time to fill in the Authorized javascript origins and Authorized redirect urls in the Google Web client project. The URL you want is the cognito domain name (example: https://exampleDomain.auth.eu-central-1.amazoncognito.com) under the Authorized javascript origins, and the cognito domain name plus /oauth2/idpresponse (example: https://exampleDomain.auth.eu-central-1.amazoncognito.com/oauth2/idpresponse).

### Step three: Configuring and running codegen
We need to run Codegen to generate our API code. Simply run
```
amplify codegen
```
and amplify should do the rest. This creates the API script file we can use to query the backend.


### Step four: install NPM packages
```
npm install
```


### Step five: start the local application
```
npm start
```


### Known errors:
If you encounter CREATE_FAILED HostedUICustomResourceInputs, it is likely that the chosen environment name is already in use. To fix this, you can change the HostedUIDomainName parameter in the amplify/backend/auth/kompetansekartleggind11d7cce/paramters.json file. This is not an ideal solution, and the changes should be kept locally. The likely reason for this error is that AWS demands that the cognito hosted UI domain name is unique in a given region.