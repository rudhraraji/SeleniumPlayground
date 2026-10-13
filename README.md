# Playwright Selenium Playground

This repository contains a TypeScript end-to-end test suite for the Selenium
Playground website. It uses Playwright Test and the Page Object Model (POM):
page objects describe how to interact with each demo, while test specs describe
the expected behavior.

Tests use the live site at `https://www.testmuai.com` by default. They verify
real browser behavior and therefore require an internet connection and an
available demo website.

## Quick start

Use Node.js 20 or later. From the repository root:

```sh
npm install
npm test
```

The same suite can be run directly with Playwright:

```sh
npx playwright test
```

Neither command requires Copilot CLI. The repository-root Playwright config
discovers specs in `playwright-pom/src/tests` and writes an HTML report.

## Continuous integration

GitHub Actions runs the TypeScript build and Playwright suite on every push and
pull request, and can also be started manually from the Actions tab. The job
uses Node.js 20 and headless Chromium. It tests the live TestMu AI demos, so the
workflow requires network access to `www.testmuai.com`.

The Playwright HTML report and test results are uploaded as a workflow artifact
for 14 days, including when tests fail.

## Project structure

```text
.
├── package.json                 # Root workspace and `npm test` command
├── playwright.config.ts         # Root config for running the suite from root
└── playwright-pom/
    ├── playwright.config.ts     # Playwright settings for the framework
    ├── package.json             # Framework scripts and dependencies
    ├── tsconfig.json            # Strict TypeScript build configuration
    ├── src/
    │   ├── config/              # Base URL and optional Jira report-link settings
    │   ├── data/                # Test data and demo navigation links
    │   ├── fixtures/            # Shared Playwright and page-object fixtures
    │   ├── pages/               # Page objects for the demos
    │   ├── tests/               # Playwright test specifications
    │   └── utils/               # Shared test helpers
    └── scripts/                 # Optional Jira and credential helpers
```

## How the framework works

1. Playwright reads the root `playwright.config.ts` when started from the
   repository root. That config reuses the framework settings and points
   Playwright at `playwright-pom/src/tests`.
2. A spec creates or receives a Playwright `page` and uses a page object from
   `src/pages/`. Page objects keep selectors and interactions together rather
   than duplicating them throughout tests.
3. Most page objects extend `BasePage`. Its `openPage(url, readyLocator)`
   helper navigates to the page, waits for document load and network idle, then
   verifies a page landmark is visible before test actions begin.
4. Tests use Playwright locators and auto-retrying assertions to check results,
   state, visibility, accessibility roles, downloads, dialogs, and browser
   interactions.
5. Shared fixtures in `src/fixtures/baseTest.ts` provide typed page objects
   where useful. `src/fixtures/test.ts` can attach a Jira issue link to Allure
   test results when `JIRA_TC_KEY` is set.

The framework uses headless Chromium by default, a 10-second action timeout,
60-second test timeout, 5-second expectation timeout, and tracing configured
for the first retry. Retries are not enabled by default.

## Implemented test coverage

The suite covers 47 spec files and 192 browser tests across these areas:

### Authentication and navigation

- **Login** — successful login and invalid, incomplete, or malformed
  credentials with validation messages.
- **Dashboard** — dashboard heading and signed-in user identity.
- **Playground navigation** — page title and links to the available demos.
- **Demo page smoke checks** — verifies that the supported demo pages open.
- **Redirection** — follows the demo link and checks the resulting page.

### Forms, inputs, and selection

- **Ajax form submission** — required fields, validation messages, and form
  submission behavior.
- **Simple form** — echoes entered text and adds two numbers.
- **Input form** — submits contact information and verifies form feedback.
- **Checkboxes** — checks and unchecks options, disabled choices, independent
  selections, and the Check All control.
- **Radio buttons** — selects values and verifies the reported selection.
- **Select dropdowns** — selects a day and multiple states.
- **jQuery searchable dropdowns** — selects categorized and multiple options
  and verifies disabled options.
- **Key presses** — enters a key and verifies the displayed result.
- **Overlapped elements** — enters values in fields that overlap.
- **Geolocation** — verifies the geolocation form fields and labels.

### Dynamic pages, alerts, and interaction

- **Auto Healing** — submits the form and checks the username field after its
  DOM ID changes.
- **Dynamic data loading** — loads user details and an image, then requests
  another user.
- **JavaScript alerts** — handles alert, confirmation, and prompt dialogs and
  verifies their outcomes.
- **Bootstrap alert messages** — checks autoclosing and manually dismissed
  success and info alerts.
- **Context menu** — right-clicks the demo target and checks the resulting
  alert.
- **Hover effects** — verifies hover and mouse-out behavior across text,
  buttons, links, and images.
- **Drag and drop** — moves items between source and target areas and resets
  the demo.
- **Range sliders** — checks defaults, value updates, limits, and invalid
  ranges.
- **Shadow DOM** — finds the shadow host and interacts with its controls.
- **iFrames and nested frames** — interacts with embedded content and checks
  nested frame structure.
- **Virtual DOM** — verifies that live clock values are displayed.
- **Window popup/modal** — opens the configured destination in a popup.

### Bootstrap and jQuery widgets

- **Bootstrap date picker** — selects, clears, and edits individual dates and
  date ranges.
- **Bootstrap download progress** — checks the initial state and successful
  completion.
- **Bootstrap list boxes** — searches and moves entries between lists.
- **Bootstrap modals** — checks single, multiple, and nested modal controls.
- **Bootstrap progress dialogs** — verifies the available timed-dialog
  controls.
- **jQuery date picker** — selects a date range from the calendar.
- **jQuery download progress bar** — starts the download dialog, checks status
  and progress controls, and cancels it.
- **jQuery dual list box** — moves a selected item between lists.

### Tables, files, and page content

- **Data list filter** — searches attendee cards, including case-insensitive
  queries and no-result states.
- **Table filter and search** — filters rows by input and restores the full
  list.
- **Table pagination** — changes the number of visible records.
- **Table sorting and search** — searches records and sorts table columns.
- **Table data download** — exports table data as CSV.
- **File download** — checks the download link and downloaded PDF.
- **File generation** — generates and downloads a text file.
- **File upload** — selects a file and verifies it is accepted.
- **Broken image demo** — checks image examples and their failed-load state.
- **Status codes** — verifies explanations for common HTTP response codes.

## Running tests

From the repository root:

```sh
npm test
npx playwright test
```

Run a specific spec or filter by test title:

```sh
npx playwright test playwright-pom/src/tests/login.spec.ts
npx playwright test --grep "Checkbox Demo"
```

Run with a different base URL:

```powershell
$env:BASE_URL = "https://example.test"
npm test
```

`BASE_URL` defaults to `https://www.testmuai.com`; trailing slashes are removed
before page paths are added.

## Reports and optional commands

The npm scripts for framework tooling are defined in
`playwright-pom/package.json`. Run them from `playwright-pom`, or invoke them
from the repository root with `npm run <script> --workspace playwright-pom`.

| Command | Purpose |
| --- | --- |
| `npm run test:report` | Run tests with the HTML reporter |
| `npm run show:report` | Open the latest HTML report |
| `npm run test:allure` | Clear previous Allure files and run tests with HTML, line, and Allure reporters |
| `npm run allure:clean` | Clear Allure results and report |
| `npm run allure:generate` | Generate an Allure report from `allure-results` |
| `npm run allure:open` | Open the generated Allure report |
| `npm run build` | Type-check and compile the TypeScript source |

The root `npm test` command uses the repository-root config and HTML reporter.
To refresh the Allure report without stale results, run `npm run test:allure
--workspace playwright-pom`, then `npm run allure:generate --workspace
playwright-pom` and `npm run allure:open --workspace playwright-pom`.
For Jira-linked Allure results, run the Jira-aware test script from
`playwright-pom`:

```sh
npm run test:jira -- GR82TEST-1
npm run test:jira -- https://gr8testing.atlassian.net/browse/GR82TEST-1 --grep "Context Menu"
```

This optional command adds the issue link to the Allure report; it does not
modify Jira or require Jira credentials. `JIRA_BASE_URL` can override the Jira
site.

The optional Jira prompt helper fetches an issue and prints its details, then
sends its description to an interactive Copilot CLI session:

```sh
npm run jira:prompt -- GR82TEST-3
npm run jira:prompt -- https://gr8testing.atlassian.net/browse/GR82TEST-3
```

This helper is separate from Playwright test execution. Set `JIRA_EMAIL` and
`JIRA_API_TOKEN` in the root `.env` file. Jira credentials and Copilot CLI are
not needed to run the tests.

## Contributing

Add or update page objects in `src/pages/` and their corresponding tests in
`src/tests/`. Keep selectors and page-specific interactions in page objects,
and use Playwright assertions in specs to express the expected behavior.
