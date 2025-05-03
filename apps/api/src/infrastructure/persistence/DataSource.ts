import dotenv from 'dotenv';
import 'tsconfig-paths/register';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { defaultAppDatabaseOptions} from './DataOptions';

dotenv.config();

export const AppDataSource = new DataSource(defaultAppDatabaseOptions);

export const setAppDataSourceOptions = (options: Partial<PostgresConnectionOptions>): void => {
  AppDataSource.setOptions({
    ...(AppDataSource.options as PostgresConnectionOptions),
    ...options,
  });
};
