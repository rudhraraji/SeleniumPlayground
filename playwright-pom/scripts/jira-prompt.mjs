import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DEFAULT_JIRA_BASE_URL = 'https://gr8testing.atlassian.net';
const REPOSITORY_ROOT = fileURLToPath(new URL('../../', import.meta.url));

function getIssueKey(input, baseUrl) {
  let issueKey = input.trim();

  if (/^https?:\/\//i.test(issueKey)) {
    const issueUrl = new URL(issueKey);
    if (issueUrl.origin !== baseUrl.origin) {
      throw new Error(`Jira URL must use the configured site ${baseUrl.origin}`);
    }

    const basePath = baseUrl.pathname.replace(/\/+$/, '');
    const issuePath = issueUrl.pathname.replace(/\/+$/, '');
    const browsePath = basePath && basePath !== '/' ? issuePath.slice(basePath.length) : issuePath;
    const match = browsePath.match(/^\/browse\/([A-Z][A-Z0-9]+-\d+)$/i);
    if (!match) {
      throw new Error('Provide a Jira issue URL in the form /browse/PROJECT-123');
    }
    issueKey = match[1];
  }

  issueKey = issueKey.toUpperCase();
  if (!/^[A-Z][A-Z0-9]+-\d+$/.test(issueKey)) {
    throw new Error('Provide a Jira issue key such as GR82TEST-3 or a Jira browse URL');
  }

  return issueKey;
}

function extractDescription(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (typeof node.text === 'string') return node.text;
  if (!Array.isArray(node.content)) return '';

  const content = node.content.map(extractDescription);
  if (node.type === 'listItem') return `- ${content.join('').trim()}`;
  if (['paragraph', 'heading', 'codeBlock', 'blockquote', 'listItem'].includes(node.type)) {
    return `${content.join('')}\n`;
  }
  return content.join('');
}

function formatList(values) {
  return Array.isArray(values) && values.length ? values.join(', ') : 'None';
}

function sendToCopilot(description) {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) {
    throw new Error('Run this command through npm to send the Jira description to Copilot CLI');
  }

  const result = spawnSync(process.execPath, [
    npmCli,
    'exec',
    '--yes',
    '--package',
    '@github/copilot',
    '--',
    'copilot',
    '--interactive',
    description,
    '--allow-all-tools',
    '--add-dir',
    REPOSITORY_ROOT,
  ], { stdio: 'inherit', windowsHide: true });

  if (result.error) {
    throw new Error(`Unable to start GitHub Copilot CLI: ${result.error.message}`);
  }
  if (result.status !== 0) {
    process.exitCode = result.status ?? 1;
  }
}

async function main() {
  const input = process.argv[2];
  if (!input || process.argv.length > 3) {
    throw new Error('Usage: npm run jira:prompt -- <issue key or Jira browse URL>');
  }

  const baseUrl = new URL(process.env.JIRA_BASE_URL ?? DEFAULT_JIRA_BASE_URL);
  if (baseUrl.protocol !== 'https:' && baseUrl.hostname !== 'localhost' && baseUrl.hostname !== '127.0.0.1') {
    throw new Error('JIRA_BASE_URL must use HTTPS');
  }
  baseUrl.pathname = `${baseUrl.pathname.replace(/\/+$/, '')}/`;
  baseUrl.search = '';
  baseUrl.hash = '';

  const issueKey = getIssueKey(input, baseUrl);
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;
  if (!email || !apiToken) {
    throw new Error('Set JIRA_EMAIL and JIRA_API_TOKEN in the root .env file');
  }

  const apiUrl = new URL(`rest/api/3/issue/${issueKey}`, baseUrl);
  apiUrl.searchParams.set(
    'fields',
    'summary,description,issuetype,status,priority,labels,components,environment',
  );
  const authorization = Buffer.from(`${email}:${apiToken}`).toString('base64');
  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${authorization}`,
    },
    redirect: 'error',
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(`Jira rejected the credentials or access to ${issueKey} (HTTP ${response.status})`);
    }
    if (response.status === 404) {
      throw new Error(`Jira issue ${issueKey} was not found or is not accessible (HTTP 404)`);
    }
    throw new Error(`Jira request failed with HTTP ${response.status}`);
  }

  const issue = await response.json();
  const fields = issue.fields ?? {};
  const description = extractDescription(fields.description).trim() || 'No description provided.';
  const lines = [
    `Jira task: ${issue.key ?? issueKey}`,
    `Type: ${fields.issuetype?.name ?? 'Unspecified'}`,
    `Status: ${fields.status?.name ?? 'Unspecified'}`,
    `Priority: ${fields.priority?.name ?? 'Unspecified'}`,
    `Labels: ${formatList(fields.labels)}`,
    `Components: ${formatList(fields.components?.map(component => component.name))}`,
    '',
    `Summary: ${fields.summary ?? 'No summary provided.'}`,
    '',
    'Description:',
    description,
  ];

  if (fields.environment) {
    lines.push('', 'Environment:', extractDescription(fields.environment).trim());
  }

  console.log(lines.join('\n'));
  console.log('\nSending the Jira description to GitHub Copilot CLI...\n');
  sendToCopilot(description);
}

main().catch(error => {
  console.error(`Unable to fetch Jira task: ${error.message}`);
  process.exitCode = 1;
});
