const defaultBaseUrl = 'https://www.testmuai.com';

export const baseUrl = (process.env.BASE_URL ?? defaultBaseUrl).replace(/\/+$/, '');

export function appUrl(path: string): string {
  return `${baseUrl}/${path.replace(/^\/+/, '')}`;
}
