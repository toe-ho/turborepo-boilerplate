import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IUser } from '@repo/type';
import { IAuthenticatedRequest } from 'src/domain/entities/IAuthenRequest';

@Injectable({ scope: Scope.REQUEST })
export class HttpRequestContext {
  constructor(@Inject(REQUEST) private readonly request: IAuthenticatedRequest) {}

  getUser(): IUser {
    return this.request.user;
  }
}
