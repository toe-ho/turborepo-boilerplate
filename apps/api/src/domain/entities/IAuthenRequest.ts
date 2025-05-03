import { Request } from 'express';
import { IUser } from '@repo/type';

export interface IAuthenticatedRequest extends Request {
  user: IUser;
}
