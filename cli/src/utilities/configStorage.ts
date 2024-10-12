import { promises as fs } from 'fs';
import path from 'path';
import { CliResults } from '../types';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.rn-new');
const CONFIG_FILE = path.join(CONFIG_DIR, 'configurations.json');

interface AppConfig {
  name: string;
  cliResults: CliResults;
}

const ensureConfigDirExists = async () => {
  try {
    await fs.mkdir(CONFIG_DIR, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
};

export const saveConfig = async (config: AppConfig): Promise<void> => {
  await ensureConfigDirExists();
  const configs = await loadConfigs();
  await fs.writeFile(CONFIG_FILE, JSON.stringify([...configs, config], null, 2));
};

export const loadConfigs = async (): Promise<AppConfig[]> => {
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};
