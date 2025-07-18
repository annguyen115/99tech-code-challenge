import * as config from 'config';
import { z } from 'zod';

const ConfigSchema = z.object({
  port: z.number(),
  mongodb: z.object({
    uri: z.string(),
    databaseName: z.string(),
    collections: z.object({
      users: z.string(),
      scores: z.string(),
      migrations: z.string(),
    }),
    migration: z.object({
      path: z.string(),
      user: z.object({
        amount: z.number(),
      }),
    }),
  }),
  auth: z.object({
    salt: z.number(),
    secret: z.string(),
    accessTokenExpire: z.string(),
    refreshTokenExpire: z.string(),
  }),
});

type AppConfig = z.infer<typeof ConfigSchema>;

const parsed = ConfigSchema.safeParse(config);

if (!parsed.success) {
  console.error('❌ Invalid config:');
  const err = parsed.error;

  for (const issue of err.issues) {
    console.error(`${issue.path.join('.')}: ${issue.message}`);
  }

  process.exit(1);
}

export const appConfig: AppConfig = parsed.data;
