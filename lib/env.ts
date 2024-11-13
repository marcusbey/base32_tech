const requiredEnvs = [
    'NEXT_PUBLIC_API_URL',
    // ... other required envs
] as const;

export function validateEnv() {
    for (const env of requiredEnvs) {
        if (!process.env[env]) {
            throw new Error(`Missing required environment variable: ${env}`);
        }
    }
}
