import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Octokit } from 'octokit';
import type { Endpoints } from '@octokit/types';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type ContributorRepsonse = Endpoints['GET /repos/{owner}/{repo}/contributors']['response']['data'];

async function getOcto() {
  if (!process.env.GITHUB_TOKEN) {
    console.error('No GitHub token provided. Please set GITHUB_TOKEN env var.');
    process.exit(1);
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  // get paginated contributors
  const res = await octokit.paginate(octokit.rest.repos.listContributors, {
    owner: 'danstepanov',
    repo: 'create-expo-stack',
    per_page: 100
  });

  const contributors = res.map((contributor) => contributor).filter((contributor) => contributor.type !== 'Bot');
  return contributors;
}

async function start() {
  const contributors = await getOcto();

  const text = [
    `// prettier-ignore`,
    `// eslint-disable`,
    `export const contributors = ${JSON.stringify(contributors, null, 4)}`,
    ``
  ].join('\n');

  const dir = path.join(__dirname, '../www/src');
  await fs.writeFile(`${dir}/contributors.ts`, text);

  const cliDir = path.join(__dirname, '../cli');
  const readmeFile = await fs.readFile(`${cliDir}/README.md`, 'utf-8');
  const startBlock = readmeFile.indexOf('<!-- CONTRIBUTORS_START -->');
  const endBlock = readmeFile.indexOf('<!-- CONTRIBUTORS_END -->');
  const udpatedUserTable = generateContributorsHtmlTable(contributors);
  const newReadme = `${readmeFile.slice(0, startBlock + 27)}\n${udpatedUserTable}\n${readmeFile.slice(endBlock)}`;
  await fs.writeFile(`${cliDir}/README.md`, newReadme);

  // format the file
  execSync('npx prettier --write cli/README.md');
}

// TODO: needs to generate a fixed about of columns
function generateContributorsHtmlTable(contributors: ContributorRepsonse) {
  // create an HTML table with the contributors
  const table = contributors
    .map((contributor) => {
      return `<tr><td><a href="${contributor.html_url}" target="_blank"><img src="${contributor.avatar_url}" width="100" alt="${contributor.login}"><br>${contributor.login}</a></td></tr>`;
    })
    .join('\n');

  return `<table>${table}</table>`;
}

start();
