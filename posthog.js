import { PostHog } from 'posthog-node';

const posthogKey = process.env.POSTHOG_PROJECT_TOKEN || process.env.POSTHOG_API_KEY || '';

const client = new PostHog(posthogKey, {
  host: process.env.POSTHOG_HOST || 'https://eu.i.posthog.com',
  disabled: !posthogKey,
});

export default client;
