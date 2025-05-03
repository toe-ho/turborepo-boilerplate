import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { IUserContext } from './IUserContext';
import { IUser } from '@repo/type';
import { HttpRequestContext } from '../HttpRequestContext';

@Injectable({ scope: Scope.REQUEST })
export class HttpUserContextService implements IUserContext {
  private currentUser: IUser;
  constructor(private readonly requestContext: HttpRequestContext) {}

  async getCurrentUser(): Promise<IUser> {
    let user = this.requestContext.getUser();
    if (!user) user = this.currentUser;
    if (!user) throw new UnauthorizedException('User not authenticated');
    return user;
  }

  async setCurrentUser(user: IUser): Promise<IUser> {
    this.currentUser = user;
    return this.currentUser;
  }
}
