import { APP_GUARD } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { appConfig } from 'src/config/AppConfig';
import { defaultAppDatabaseOptions } from 'src/infrastructure/persistence/DataOptions';
import { AppDataSource } from 'src/infrastructure/persistence/DataSource';
import { JwtAuthGuard } from 'src/guard/JwtAuthGuard';
import { DataSource } from 'typeorm';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: appConfig.jwt.secret,
      signOptions: { expiresIn: appConfig.jwt.expiresIn },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...defaultAppDatabaseOptions,
        migrations: [],
      }),
    }),
    CqrsModule,
    // LoggerModule.forRoot({
    //   serviceName: 'clothify',
    //   isWriteFile: false,
    //   level: 'info',
    //   prettyPrint: process.env.NODE_ENV === 'local',
    // }),
    TypeOrmModule.forFeature([
      
    ]),
  ],
  providers: [
    {
      provide: 'DataSource',
      useFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await new DataSource({ ...defaultAppDatabaseOptions, migrations: [] }).initialize();
        }
        return AppDataSource;
      },
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [
    PassportModule,
    CqrsModule,
    TypeOrmModule,
    JwtModule,
  ],
})
export class SharedModule {}
