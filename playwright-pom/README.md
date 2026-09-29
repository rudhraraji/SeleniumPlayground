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

## Contributing

Feel free to submit issues or pull requests to improve the framework or add new features.