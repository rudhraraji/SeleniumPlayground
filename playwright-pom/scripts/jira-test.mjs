import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const input = process.argv[2]?.trim();
if (!input) {
  console.error('Usage: npm run test:jira -- <issue key or Jira browse URL> [Playwright options]');
  process.exit(1);
}

const baseUrl = new URL(process.env.JIRA_BASE_URL ?? 'https://gr8testing.atlassian.net');
let issueKey = input;

if (/^https?:\/\//i.test(issueKey)) {
  const issueUrl = new URL(issueKey);
  if (issueUrl.origin !== baseUrl.origin) {
    console.error(`Jira URL must use the configured site ${baseUrl.origin}`);
    process.exit(1);
  }

  const basePath = baseUrl.pathname.replace(/\/+$/, '');
  const issuePath = issueUrl.pathname.replace(/\/+$/, '');
  const browsePath = basePath && basePath !== '/' ? issuePath.slice(basePath.length) : issuePath;
  const match = browsePath.match(/^\/browse\/([A-Z][A-Z0-9]+-\d+)$/i);
  if (!match) {
    console.error('Provide a Jira issue URL in the form /browse/PROJECT-123');
    process.exit(1);
  }
  issueKey = match[1];
}

issueKey = issueKey.toUpperCase();
if (!/^[A-Z][A-Z0-9]+-\d+$/.test(issueKey)) {
  console.error('Provide a Jira issue key such as GR82TEST-4 or a Jira browse URL');
  process.exit(1);
}

const playwrightCli = fileURLToPath(new URL('../node_modules/@playwright/test/cli.js', import.meta.url));
const child = spawn(
  process.execPath,
  [playwrightCli, 'test', ...process.argv.slice(3)],
  {
    env: { ...process.env, JIRA_ISSUE_KEY: issueKey },
    stdio: 'inherit',
  },
);

child.on('error', error => {
  console.error(`Unable to start Playwright: ${error.message}`);
  process.exitCode = 1;
});
child.on('exit', (code, signal) => {
  if (signal) {
    console.error(`Playwright exited after signal ${signal}`);
    process.exitCode = 1;
  } else {
    process.exitCode = code ?? 1;
  }
});
