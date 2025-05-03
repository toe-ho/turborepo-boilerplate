import { Module, DynamicModule, Logger } from '@nestjs/common';
import { ApiModule } from './module/api.module';
import { BackgroundModule } from './module/background.module';
import { appConfig } from './config/AppConfig';
import { CronModule } from './module/cron.module';

@Module({})
export class AppModule {
  static register(): DynamicModule {
    const appMode = appConfig.appMode;
    Logger.log(`Application is running with mode [${appMode.toUpperCase()}]`);

    const imports = [];
    if (appMode === 'api') imports.push(ApiModule);
    else if (appMode === 'cron') imports.push(CronModule);
    else if (appMode === 'background') imports.push(BackgroundModule);
    else {
      imports.push(ApiModule);
      imports.push(BackgroundModule);
      imports.push(CronModule);
    }

    return {
      module: AppModule,
      imports,
    };
  }
}
