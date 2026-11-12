# CI/CD with GitHub Actions

![IBM Skills Network](https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0322EN-SkillsNetwork/images/IDSN-logo.png)

**Estimated time:** 60 minutes

---

## Lab Overview

As the development team grows, front-end and back-end engineers need to work on the repository simultaneously. Code pushed to the main branch must follow the team's coding standards and be free of syntax errors.

This lab adds linting and client-side build validation to the project using GitHub Actions.

The workflow automatically runs when:

- Code is pushed to the `main` or `master` branch.
- A pull request is created for the `main` or `master` branch.

---

## Prerequisites

Before starting this lab, confirm that:

- The back-end application has been created.
- The front-end application has been created.
- The front end and back end have been integrated.
- All project code has been pushed to the GitHub repository.
- The repository contains the required project files.
- You have access to the forked GitHub repository.

---

## What Is Linting?

Linting is an automated code-review process that checks source code for:

- Syntax errors.
- Coding-style violations.
- Inconsistent formatting.
- Common programming mistakes.
- Potential security issues.
- Non-compliance with team coding standards.

Linting helps improve code quality, maintain consistency, and prevent errors before code is merged into the main codebase.

---

## GitHub Actions Workflow

Create a workflow file named `main.yml` inside the following directory:

".github/workflows/main.yml"

Add the following GitHub Actions workflow:

"yaml
name: 'CI/CD'

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

jobs:
  lint_js:
    name: Lint JavaScript Files
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 14

      - name: Install JSHint
        run: npm install jshint --global

      - name: Run Linter
        run: |
          # Find JavaScript files recursively and run JSHint on them
          find ./giftlink-backend -name app.js -exec jshint {} +
          find ./giftlink-backend -name auth.js -exec jshint {} +
          find ./giftlink-backend -name giftRoutes.js -exec jshint {} +
          find ./giftlink-backend -name searchRoutes.js -exec jshint {} +
          echo "Linted all the JavaScript files successfully"

  client_build:
    name: Build Client
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 14

      - name: Run Build
        run: |
          cd giftlink-frontend
          npm install
          npm run build
          echo "Client-side build completed successfully"
"

---

## Workflow Explanation

### Workflow Name

The workflow name is defined on the first line:

"name: 'CI/CD'"

This name appears in the GitHub Actions interface.

### Workflow Triggers

The `on` section defines when the workflow runs.

The workflow runs when code is pushed to either the `master` or `main` branch:

"yaml
push:
  branches: [master, main]
"

The workflow also runs when a pull request is created for either the `master` or `main` branch:

"yaml
pull_request:
  branches: [master, main]
"

---

## Workflow Jobs

The workflow contains two jobs:

1. `lint_js`
2. `client_build`

### Job 1: `lint_js`

The `lint_js` job checks the specified JavaScript files using JSHint.

This job:

1. Checks out the repository.
2. Installs Node.js.
3. Installs JSHint globally.
4. Runs JSHint on the required JavaScript files.
5. Displays a success message when linting is complete.

The files checked by the workflow are:

- `app.js`
- `auth.js`
- `giftRoutes.js`
- `searchRoutes.js`

The files are searched for inside the `giftlink-backend` directory.

### Job 2: `client_build`

The `client_build` job verifies that the React client can be built successfully.

This job:

1. Checks out the repository.
2. Installs Node.js.
3. Changes into the `giftlink-frontend` directory.
4. Installs the front-end packages.
5. Runs the client build command.
6. Displays a success message when the build is complete.

---

## Enable GitHub Actions

Follow these steps to enable GitHub Actions:

1. Log in to GitHub.
2. Open the forked project repository.
3. Select the **Actions** tab.
4. Select **Set up a workflow yourself**.
5. Add the workflow configuration to `main.yml`.
6. Commit the workflow file.
7. Push the commit to the repository.

After the workflow file is committed, GitHub Actions automatically starts the workflow.

---

## View the Workflow Results

1. Open the repository on GitHub.
2. Select the **Actions** tab.
3. Select the latest workflow run.
4. Open the individual jobs.
5. Review the logs for the `lint_js` job.
6. Review the logs for the `client_build` job.
7. Confirm that each job completed successfully.

A green check mark indicates that the workflow completed successfully.

A red cross indicates that the workflow found an error. Review the job logs to identify and resolve the problem.

---

## Resolve Common JSHint Errors

JSHint may report errors when the project uses modern JavaScript features.

Common errors include:

"javascript
'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).

'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').

'async functions' is only available in ES8 (use 'esversion: 8').

'let' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).

'template literal syntax' is only available in ES6 (use 'esversion: 6').
"

### Resolution

Add the following JSHint configuration comment at the beginning of the file where the error is reported:

"javascript
/*jshint esversion: 8 */
"

This enables support for JavaScript features introduced in ECMAScript 2017 and earlier versions.

After making the correction:

1. Save the file.
2. Commit the changes.
3. Push the changes to GitHub.
4. Open the **Actions** tab.
5. Review the new workflow run.
6. Confirm that the linting job completes successfully.

---

# Assessment Options

## Option 1: AI-Graded Submission and Evaluation

### Install GitHub CLI

Update the package list:

"bash
sudo apt update
"

Install the GitHub CLI:

"bash
sudo apt install gh
"

### Authenticate GitHub CLI

Start the authentication process:

"shell
gh auth login
"

When prompted, select the following options:

| Prompt | Selection |
|---|---|
| What account do you want to log into? | GitHub.com |
| What is your preferred protocol for Git operations? | HTTPS |
| Authenticate Git with your GitHub credentials? | Yes |
| How would you like to authenticate GitHub CLI? | Paste an authentication token |

If you do not already have a Personal Access Token, generate one using the course instructions.

The token must include the following scopes:

- `repo`
- `read:org`
- `workflow`

When prompted, paste the Personal Access Token into the terminal.

If you receive the following error:

"missing required scope"

Generate a new token and confirm that it includes:

- `repo`
- `read:org`
- `workflow`

After successful authentication, GitHub CLI should confirm that:

- The Git protocol has been configured.
- You are logged in with your GitHub username.

---

## Clone the Repository

Clone the GitHub repository:

"shell
git clone <your-github-repository-link>
"

Move into the project directory:

"shell
cd xrwvm-fullstack_capstone_project
"

Make sure that you are inside the correct project directory before continuing.

---

## List GitHub Actions Workflow Runs

Run the following command from the project directory:

"bash
gh run list
"

Review the list of workflow runs and identify the latest `run-id`.

View detailed information about the latest workflow run:

"bash
gh run view <run-id> --verbose
"

Replace `<run-id>` with the workflow run ID displayed by the previous command.

The detailed output should show:

- The workflow name.
- The workflow status.
- The jobs that were executed.
- The steps completed by each job.
- Any errors that occurred.
- The final workflow result.

Make sure that:

- You are inside the correct repository directory.
- You authenticated successfully using `gh auth login`.
- The workflow completed successfully.

Copy the terminal output showing the successful GitHub Actions workflow and save it in a text file named:

"CI-CD.txt"

The output should clearly display the workflow steps that were executed.

---

## Option 2: Peer-Graded Submission and Evaluation

For peer-grading, take a screenshot showing that the GitHub Actions workflow completed successfully.

Save the screenshot using one of the following filenames:

"CI-CD.png"

or

"CI-CD.jpeg"

The screenshot should clearly show:

- The GitHub Actions workflow name.
- The successful workflow status.
- The completed jobs.
- The green check mark confirming success.

---

## Verification Checklist

### Repository Preparation

- [x] The back-end code is complete.
- [x] The front-end code is complete.
- [x] The front end and back end are integrated.
- [x] All project files are present in the GitHub repository.
- [x] The latest code has been pushed to GitHub.

### GitHub Actions Configuration

- [x] GitHub Actions is enabled.
- [x] The `.github/workflows` directory exists.
- [x] The `main.yml` workflow file exists.
- [x] The workflow runs on pushes to `main` or `master`.
- [x] The workflow runs on pull requests to `main` or `master`.
- [x] The `lint_js` job is configured.
- [x] The `client_build` job is configured.

### Linting Validation

- [x] JSHint is installed by the workflow.
- [x] The required JavaScript files are linted.
- [x] Modern JavaScript syntax is configured correctly.
- [x] All linting errors have been resolved.
- [x] The `lint_js` job completes successfully.

### Client Build Validation

- [x] The workflow enters the `giftlink-frontend` directory.
- [x] Front-end dependencies are installed.
- [x] The client build command runs successfully.
- [x] The `client_build` job completes successfully.

### Assessment Submission

- [x] The workflow result has been reviewed.
- [x] The GitHub Actions logs have been checked.
- [x] The required terminal output has been saved as `CI-CD.txt`, if using Option 1.
- [x] The successful workflow screenshot has been saved as `CI-CD.png` or `CI-CD.jpeg`, if using Option 2.

---

## Lab Summary

In this lab, GitHub Actions was added to the project to automate code-quality checks and client-side build validation.

The workflow automatically:

- Checks JavaScript files for syntax and style errors.
- Validates the coding standards of the project.
- Builds the client-side application.
- Runs when code is pushed to the main branch.
- Runs when a pull request is created.
- Displays logs for each job.

This CI/CD process helps ensure that new code follows team coding guidelines and is less likely to introduce errors into the application.

---

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

---

© IBM Corporation. All rights reserved.

This lab content is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
