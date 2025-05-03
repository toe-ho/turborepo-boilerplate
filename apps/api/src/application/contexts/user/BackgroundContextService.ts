import { Injectable } from '@nestjs/common';
import { IUser } from '@repo/type';
import { IUserContext } from './IUserContext';

@Injectable()
export class BackgroundContextService implements IUserContext {
  private systemUser: IUser | null = null;

  constructor() {
    this.systemUser = { id: 1, username: 'System' } as IUser;
  }
  setCurrentUser(user: IUser): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  async getCurrentUser(): Promise<IUser> {
    if (!this.systemUser) {
      throw new Error('No context available for background tasks');
    }
    return this.systemUser;
  }
}
