import { APP_GUARD } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { appConfig } from 'src/config/AppConfig';
import { defaultAppDatabaseOptions } from 'src/infrastructure/persistence/DataOptions';
import { AppDataSource } from 'src/infrastructure/persistence/DataSource';
import { JwtAuthGuard } from 'src/guard/JwtAuthGuard';
import { DataSource } from 'typeorm';
import { JwtStrategy } from 'src/infrastructure/auth/JwtStrategy';
import { UserModel } from 'src/infrastructure/persistence/models/UserModel';
import { OrganizationEmployeeModel } from 'src/infrastructure/persistence/models/OrganizationEmployeeModel';
import { OrganizationRoleModel } from 'src/infrastructure/persistence/models/OrganizationRoleModel';
import { OrganizationModel } from 'src/infrastructure/persistence/models/OrganizationModel';
import { UserService } from 'src/application/services/impl/UserService';
import { UserRepository } from 'src/infrastructure/repositories/UserRepository';
import { HttpUserContextService } from 'src/application/contexts/user/HttpUserContextService';
import { IUserContextToken } from 'src/application/contexts/user/IUserContext';
import { HttpRequestContext } from 'src/application/contexts/HttpRequestContext';
import { AxiosFactoryService } from 'src/application/factories/axios/AxiosFactoryService';
import { HttpLogModel } from 'src/infrastructure/persistence/models/HttpLogModel';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: appConfig.supabase.jwtSecret
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
      HttpLogModel,
      UserModel,
      OrganizationModel,
      OrganizationEmployeeModel,
      OrganizationRoleModel,
    ]),
  ],
  providers: [
    JwtStrategy,
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
    HttpRequestContext,
    {
      provide: IUserContextToken,
      useClass: HttpUserContextService,
    },


    // repository
    UserRepository,

    // service
    AxiosFactoryService,
    UserService,
  ],
  exports: [
    PassportModule,
    CqrsModule,
    TypeOrmModule,
    JwtModule,
    JwtStrategy,

    // service
    AxiosFactoryService,
    UserService,

    // repository
    UserRepository,



    IUserContextToken,
  ],
})
export class SharedModule {}
