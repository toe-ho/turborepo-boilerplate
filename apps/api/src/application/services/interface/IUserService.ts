import { IUser } from '@repo/type';

export interface IUserService {
  sendOTP(data: { username: string }): Promise<void>;
  login(data: { username: string; otp: string }): Promise<{ token: string }>;
  get(userId: number): Promise<IUser>;
  logout(): Promise<void>;
}
