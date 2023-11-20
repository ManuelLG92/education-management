import { Options } from '@mikro-orm/postgresql';
import { ReflectMetadataProvider } from '@mikro-orm/core';

const mikroOrmConfig: Options = {
  type: 'postgresql',
  host: '127.0.0.1',
  port: 5432,
  user: 'root',
  password: 'root',
  dbName: 'edu',
  metadataProvider: ReflectMetadataProvider,
  // entities: ['./src/**/persistence/*.repository.js'],
  entities: ['./src/**/persistence/*entity.js'],
  // entitiesTs: ['./dist/**/persistence/*.repository.ts'],
  entitiesTs: ['./src/**/persistence/*entity.ts'],
};

export default mikroOrmConfig;
