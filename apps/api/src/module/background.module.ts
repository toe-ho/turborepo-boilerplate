import { Module } from '@nestjs/common';
import { SharedModule } from './share.module';
import { IUserContextToken } from 'src/application/contexts/user/IUserContext';
import { BackgroundContextService } from 'src/application/contexts/user/BackgroundContextService';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: IUserContextToken,
      useClass: BackgroundContextService,
    },
  ],
  exports: [
    
  ],
})
export class BackgroundModule {}
