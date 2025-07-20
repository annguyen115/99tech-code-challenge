import { mongoMigrateCli as migrateCli } from 'mongo-migrate-ts';
import { appConfig } from '@config';

export default migrateCli({
  uri: `${appConfig.mongodb.uri}/${appConfig.mongodb.databaseName}`,
  migrationsDir: `${appConfig.mongodb.migration.path}`,
  migrationsCollection: appConfig.mongodb.collections.migrations,
});
