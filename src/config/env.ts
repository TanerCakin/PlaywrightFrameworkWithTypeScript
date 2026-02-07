import * as dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string, fallback?: string): string {
  const value = process.env[name];
  if (value && value.trim().length > 0) {
    return value.trim();
  }
  if (fallback !== undefined) {
    return fallback;
  }
  throw new Error(`Environment variable ${name} is not defined`);
}

export const env = {
  BASE_URL: getEnv('BASE_URL', ''),
  TN_EMAIL: getEnv('TN_EMAIL', ''),
  TN_PASSWORD: getEnv('TN_PASSWORD', '')
};

export const hasValidCredentials = (): boolean => {
  return Boolean(env.TN_EMAIL && env.TN_PASSWORD);
};
