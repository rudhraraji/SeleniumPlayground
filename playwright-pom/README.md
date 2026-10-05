# Playwright Page Object Model Framework

This project is a reusable Playwright framework that implements the Page Object Model (POM) design pattern for the Selenium Playground site.

## Project Structure

```
playwright-pom
├── src
│   ├── pages
│   │   ├── BasePage.ts        # Shared navigation, interaction, and assertion helpers.
│   │   └── LoginPage.ts       # Login page interactions and assertions.
│   ├── tests
│   │   └── login.spec.ts       # Test suite for the login functionality.
│   ├── fixtures
│   │   └── users.ts            # Exports an array of user objects for testing.
│   └── utils
│       └── helpers.ts          # Utility functions for common tasks in tests.
├── playwright.config.ts         # Configuration file for Playwright.
├── package.json                 # npm configuration file with dependencies and scripts.
├── tsconfig.json                # TypeScript configuration file.
├── .gitignore                   # Specifies files to be ignored by Git.
└── README.md                    # Documentation for the project.
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd playwright-pom
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the tests:**
   ```
   npx playwright test
   ```

## Usage

- The `LoginPage` class in `src/pages/LoginPage.ts` encapsulates all interactions with the login page.
- The test suite in `src/tests/login.spec.ts` demonstrates how to use the `LoginPage` class to perform login tests.
- Page objects are available as typed fixtures from `src/fixtures/baseTest.ts`, including `loginPage`, `dashboardPage`, `playgroundPage`, `ajaxFormSubmitPage`, and `bootstrapListBoxPage`.
- Set `BASE_URL` to run against another environment. It defaults to `https://www.testmuai.com`.

## Examples

- To run a specific test file:
  ```
  npx playwright test src/tests/login.spec.ts
  ```

- To generate the interactive HTML test report:
  ```
  npm run test:report
  ```

- To open the most recently generated report in a browser:
  ```
  npm run show:report
  ```

  The report is written to `playwright-report/`. The project’s Playwright configuration uses the HTML reporter by default.

- To run the suite with Allure and generate an interactive Allure report:
  ```
  npm run test:allure
  npm run allure:generate
  npm run allure:open
  ```

  Test results are written to `allure-results/` and the generated report to `allure-report/`.
  To link a test run to a Jira issue in Allure, pass its key or browse URL:
  ```sh
  npm run test:jira -- GR82TEST-4
  npm run test:jira -- https://gr8testing.atlassian.net/browse/GR82TEST-4 --grep "Context Menu"
  ```

  This adds a report link only; it does not modify the Jira issue or require Jira credentials.
  Running `npm test` directly does not add a Jira link.

- To fetch a Jira task as a prompt, pass either its issue key or browse URL:
  ```sh
  npm run jira:prompt -- GR82TEST-3
  npm run jira:prompt -- https://gr8testing.atlassian.net/browse/GR82TEST-3
  ```

  The issue details are printed and passed to GitHub Copilot CLI as the task prompt.
  Copilot inspects the relevant code, summarizes its findings and proposed coverage, then
  waits for explicit approval before editing.

  On Windows, run `npm run jira:credential:save` once to store your Jira email and API
  token in Windows Credential Manager. Subsequent runs read the token from there. You can
  also provide `JIRA_EMAIL` and `JIRA_API_TOKEN` environment variables; outside Windows,
  both are required. The command prints the issue summary, description, status, priority,
  labels, components, and environment; it does not change the Jira issue. `JIRA_BASE_URL`
  can override the default Jira site.

## Contributing

Feel free to submit issues or pull requests to improve the framework or add new features.