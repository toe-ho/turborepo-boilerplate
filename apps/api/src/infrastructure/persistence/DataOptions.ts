import { appConfig } from 'src/config/AppConfig';
import { UserModel } from './models/UserModel';
import { OrganizationModel } from './models/OrganizationModel';
import { OrganizationEmployeeModel } from './models/OrganizationEmployeeModel';
import { OrganizationRoleModel } from './models/OrganizationRoleModel';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// Helper function for default database configuration
const getDefaultDatabaseOptions = (): PostgresConnectionOptions => ({
  type: 'postgres',
  url: appConfig.database.url || 'localhost',
  extra: { max: 10, min: 2, idleTimeoutMillis: 30000, connectionTimeoutMillis: 10000 },
  entities: [
    UserModel,
    OrganizationModel,
    OrganizationEmployeeModel,
    OrganizationRoleModel
  ],
  migrations: [
    'src/infrastructure/persistence/migrations/*{.ts,.js}',
    'src/infrastructure/persistence/seeds/*{.ts,.js}',
  ],
});

export const defaultAppDatabaseOptions = getDefaultDatabaseOptions();
