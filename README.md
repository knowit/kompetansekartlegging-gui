This is an internal project for Knowit Objectnet. The project aims to create a tool to gauge the employees' skills and motivations through a web form, and to make the analyses based on the form available for the individual employees and managers. 

## Dependencies

This project requires [npm](https://www.npmjs.com/get-npm) and the [Amplify CLI](https://docs.amplify.aws/cli/start/install). 

## Running the project

Currently, the latest version of the project lies within the `dev` branch. To run the project locally:
1. Clone the GitHub repo.
2. Run `$ cd kompetansekartlegging-gui` (or whatever you've chosen to name the project in the cloning process).
3. Run `$ amplify init`, and choose an existing environment---by default, the name of an environment will match the name of a branch, so for the `dev` branch the environment name will be `dev`.
4. Run `$ amplify pull` to make sure that you have the most recent cloud configuration locally. 
5. Run `$ npm install`
6. Run `npm start`. 

NOTE: There seems to be a bug with Amplify auth that makes it impossible to log in using Google locally, because the URL redirects to another URL. Amplify allows to specify multiple redirect URLs, but it appears that it doesn't work as intended. 

## Contributing

Contributing to this project is a little more involved since we're using Amplify. 

There are two different ways to contribute to an Amplify project, either by [sharing environments](https://docs.amplify.aws/cli/teams/shared) or by using [sandbox environments](https://docs.amplify.aws/cli/teams/sandbox). For contributing to the `master` and `dev` branches, sandbox environments should be utilized. 

## Continuous Deployment

We have [CD](https://dev.d2kxnm6tljibk7.amplifyapp.com/) set up. It is triggered by updating the `dev` branch. 

## Updating Amplify resources

To update an Amplify `category`, i.e. `auth`, run the command `$ amplify update category`. 

## Not-so-obvious things to know

1. All Amplify environment information is contained in `amplify/team-provider-info.json` (which is put in `.gitignore` since it contains secrets). 
2. Environment variables can be set in the Amplify Console (and probably the CLI as well)

## Useful links

1. [Amplify CLI documentation](https://docs.amplify.aws/cli)
1. [Amplify Library documentation](https://docs.amplify.aws/lib/q/platform/js)

## Problems?
Questions related to Amplify not covered by this document can be directed to `bjorn.iversen@knowit.no`. 

