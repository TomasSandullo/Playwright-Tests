# Playwright test project

## Prerequisites
Ensure to have the following tools installed on your machine:

-Node.js 16.0+
-npm

### Optional but recommend
-Visual studio code
-Playwright extension for VSCode

## Getting started
1- Clone this repository to your local machine

git clone <repository-url>

2- Configure the .env file

Inside the main project exists a file called .env
This file needs to be configured with your own credentials,
email, password and bearer token needs to be adedded.
baseUrl and role for API testing are already set up, but
can be modify in case that exists new endpoint requirements.

3-Open a Command prompt on the project folder

4-Run the test cases with the following commands

npx playwright test --> Executes all the test cases without UI
npx playwright test --ui --> Exceutes all the test cases with UI



