import { IUser } from '@repo/type';
import { IBaseRepository } from './IBaseRepository';

export interface IUserRepository extends IBaseRepository<IUser> {
  findByUsernameAndHashPassword(username: string, hashPassword: string): Promise<IUser | null>;
}
