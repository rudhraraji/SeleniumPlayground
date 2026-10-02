const env = (globalThis as typeof globalThis & {
	process?: { env?: Record<string, string | undefined> };
}).process?.env ?? {};

const jiraBaseUrl = (env.JIRA_BASE_URL ?? 'https://gr8testing.atlassian.net').replace(/\/+$/, '');
const rawIssueKey = env.JIRA_TC_KEY?.trim();

export const jiraIssueKey = rawIssueKey?.toUpperCase();
export const jiraIssueUrl = jiraIssueKey ? `${jiraBaseUrl}/browse/${jiraIssueKey}` : undefined;
