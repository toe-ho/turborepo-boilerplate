import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface ChatDatabaseOptions extends PostgresConnectionOptions {
  schema: string;
}

// Helper function for default database configuration
const getDefaultDatabaseOptions = (): ChatDatabaseOptions => ({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'localhost',
  schema: process.env.DATABASE_SCHEMA || 'public',
  
  extra: { max: 10, min: 2, idleTimeoutMillis: 30000, connectionTimeoutMillis: 10000 },
  entities: [
    
  ],
  migrations: [
    'src/infrastructure/persistence/migrations/*{.ts,.js}',
    'src/infrastructure/persistence/seeds/*{.ts,.js}',
  ],
});

export const defaultAppDatabaseOptions = getDefaultDatabaseOptions();
