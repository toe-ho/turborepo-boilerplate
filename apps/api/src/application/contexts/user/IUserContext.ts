import { IUser } from '@repo/type';

export const IUserContextToken = 'IUserContext';
export interface IUserContext {
  getCurrentUser(): Promise<IUser>;
  setCurrentUser(user: IUser): Promise<IUser>;
}
