# Playwright Page Object Model Framework

This project is a reusable Playwright framework that implements the Page Object Model (POM) design pattern for the Selenium Playground site.

## Project Structure

```
playwright-pom
├── src
│   ├── config/       # Base URL and optional Jira report-link configuration.
│   ├── data/         # Test data and playground navigation links.
│   ├── fixtures/     # Shared Playwright fixtures and Jira reporting hook.
│   ├── pages/        # Page objects; shared navigation/readiness is in BasePage.
│   ├── tests/        # Playwright specs.
│   └── utils/        # Reusable test utilities.
├── scripts/          # Jira CLI and Windows credential helpers.
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository and install dependencies from its root:**
   ```
   git clone <repository-url>
   cd <repository-directory>
   npm install
   ```

2. **Run the tests from the repository root:**
   ```
   npx playwright test
   ```

## Usage

The npm scripts below are defined in `playwright-pom/package.json`; run them from
that directory, or use `npm run --workspace playwright-pom <script>` from the repository root.

- Page objects in `src/pages/` encapsulate interactions with each demo. Use `BasePage.openPage(url, readyLocator)` for standard navigation that waits for document load and a visible page landmark; retain explicit readiness checks where a demo needs additional setup.
- The specs in `src/tests/` exercise those page objects with Playwright.
- `src/fixtures/baseTest.ts` provides typed page-object fixtures for login, dashboard, playground, Ajax form, and Bootstrap list-box tests. `src/fixtures/test.ts` adds an optional Jira issue link to Allure reports.
- Set `BASE_URL` to run against another environment. It defaults to `https://www.testmuai.com`.

## Examples

- To run a specific test file:
  ```
  npx playwright test playwright-pom/src/tests/login.spec.ts
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
  npm run test:jira -- GR82TEST-1
  npm run test:jira -- https://gr8testing.atlassian.net/browse/GR82TEST-1 --grep "Context Menu"
  ```

  This adds a report link only; it does not modify the Jira issue or require Jira credentials.
  Running `npm test` directly does not add a Jira link.

- To fetch a Jira task as a prompt, pass either its issue key or browse URL:
  ```sh
  npm run jira:prompt -- GR82TEST-3
  npm run jira:prompt -- https://gr8testing.atlassian.net/browse/GR82TEST-3
  ```

  This optional helper is separate from Playwright test execution. Running
  `npx playwright test` does not require or invoke Copilot CLI. The helper prints
  the issue details, then sends the Jira description to an interactive Copilot CLI session.

  On Windows, run `npm run jira:credential:save` once to store your Jira email and API
  token in Windows Credential Manager. Subsequent runs read the token from there. You can
  also provide `JIRA_EMAIL` and `JIRA_API_TOKEN` environment variables; outside Windows,
  both are required. The command prints the issue summary, description, status, priority,
  labels, components, and environment; it does not change the Jira issue. `JIRA_BASE_URL`
  can override the default Jira site.

## Contributing

Feel free to submit issues or pull requests to improve the framework or add new features.