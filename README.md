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

## Contributing

Contributing to this project is a little more involved since we're using Amplify. 

There are two different ways to contribute to an Amplify project, either by [sharing environments](https://docs.amplify.aws/cli/teams/shared) or by using [sandbox environments](https://docs.amplify.aws/cli/teams/sandbox). For contributing to the `master` and `dev` branches, sandbox environments should be utilized. 

## Continuous Deployment

We have [CD](https://dev.d2kxnm6tljibk7.amplifyapp.com/) set up. It is triggered by updating the `dev` branch. 

