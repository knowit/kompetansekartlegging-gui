This is an internal project for Knowit Objectnet. The project aims
to create a tool to gauge the employees' skills and motivations
through a web form, and to make the analyses based on the form
available for the individual employees and managers.

## API docs
Documentation for the external API can be found at [this projects
Github Pages](https://knowit.github.io/kompetansekartlegging-gui/).

## Dependencies

This project requires [npm](https://www.npmjs.com/get-npm) and the [Amplify CLI](https://docs.amplify.aws/cli/start/install).

## Running the project

Currently, the latest version of the project lies within the `dev`
branch. To run the project locally:

1. Clone the GitHub repo.
2. Run `$ cd kompetansekartlegging-gui` (or whatever you've chosen to
   name the project in the cloning process).
3. Run `$ amplify init`, and choose an existing environment---by
   default, the name of an environment will match the name of a
   branch, so for the `dev` branch the environment name will be `dev`.
4. Run `$ amplify pull` to make sure that you have the most recent
   cloud configuration locally.
5. Run `$ npm install`
6. Run `npm start`.

NOTE: There seems to be a bug with Amplify auth that makes it
impossible to log in using Google locally, because the URL redirects
to another URL. Amplify allows to specify multiple redirect URLs, but
it appears that it doesn't work as intended.

## Contributing

Contributing to this project is a little more involved since we're
using Amplify.

There are two different ways to contribute to an Amplify project,
either by [sharing
environments](https://docs.amplify.aws/cli/teams/shared) or by using
[sandbox
environments](https://docs.amplify.aws/cli/teams/sandbox). For
contributing to the `master` and `dev` branches, sandbox environments
should be utilized.

### Adding people to Amplify

-   Open the [AWS IAM
    Console](https://console.aws.amazon.com/iam/home?region=eu-central-1#/home).
-   Go to Users
-   Click "Add user"
-   Choose user name, and check AWS Management Console access
-   Click Next
-   Select "Copy permissions from existing user" and select a user
    with correct policies (such as yourself)
-   Click next until the user is created.

### Creating new environment

NOTE: Creating a sandbox environment should only be done if necessary
as the steps necessary are somewhat complicated.

-   `amplify init`
-   Use existing environment: No
-   AWS profile: Yes
-   Google Web Client ID and secret: Get from team-provider-info.json
    > dev > categories > auth > kompetansekartlegging >
    hostedUIProviderCreds
-   `amplify push`
-   Update Environment table ID:
    -   Go to tables in [DynamoDB](https://eu-central-1.console.aws.amazon.com/dynamodb/home?region=eu-central-1#tables)
    -   Find a table from your newly created env. Tables are named:
        TableType-generatedid-envname, and open this table.
-   Authorize redirect URL:
    -   Open [Google Developer Console](https://console.developers.google.com/)
    -   Open Project "Kompetansekartlegging". If this cannot be found,
        access must be granted by asking drift.
    -   Open Credentials > OAuth 2.0 Client IDs > Cognito
    -   Add URI: copy one of the existing URI, and change the
        environment name to yours.
    -   Save
-   To make enviroment accessible by others: `git secret hide && git push`

## Updating Amplify resources

To update an Amplify `category`, i.e. `auth`, run the command `$
amplify update category`.

## Not-so-obvious things to know

All Amplify environment information is contained in
`amplify/team-provider-info.json` (which is put in `.gitignore` since
it contains secrets). This means that environment information has to
be pulled manually (by finding the right Amplify CLI command for the
respective environment in the Amplify console). We are currently using
[git-secret](https://git-secret.io/#using-gpg) to safely encrypt the
environments file.

## Useful links

1. [Amplify CLI documentation](https://docs.amplify.aws/cli)
1. [Amplify Library documentation](https://docs.amplify.aws/lib/q/platform/js)

## Problems?

Questions related to Amplify not covered by this document can be
directed to `bjorn.iversen@knowit.no`.
