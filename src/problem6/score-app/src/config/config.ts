import { z } from 'zod';

const EnvSchema = z.object({
  REACT_APP_API_URL: z.string(),
  REACT_APP_SOCKET_SERVER_SCORE_URL: z.string(),
  REACT_APP_ACCESS_TOKEN_KEY: z.string().min(1),
  REACT_APP_REFRESH_TOKEN_KEY: z.string().min(1),
});

const parse = EnvSchema.safeParse(process.env);

if (!parse.success) {
  console.error('❌ Invalid environment variables');
  for (const issue of parse.error.issues) {
    console.error(`${issue.path.join('.')}: ${issue.message}`);
  }
  throw new Error('Invalid environment variables');
}

export const appConfig = parse.data;