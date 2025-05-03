import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AppDataSource, setAppDataSourceOptions } from './DataSource';
import { defaultAppDatabaseOptions } from './DataOptions';

@Module({
  imports: [ConfigModule],
})
export class DatabaseModule {
  static forRoot(options: Partial<PostgresConnectionOptions> = defaultAppDatabaseOptions): DynamicModule {
    setAppDataSourceOptions(options);

    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () =>
            ({
              ...(AppDataSource.options as PostgresConnectionOptions), // Use valid PostgreSQL options
              migrations: ['src/infrastructure/persistence/migrations/*.ts'],
            }) as any,
        }),
        TypeOrmModule.forFeature([
        ]),
      ],
    };
  }
}
