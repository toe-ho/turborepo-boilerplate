import { IUser } from "../IUser";

export interface ILoginDto {
  username: string;
  otp: string;
}

export interface IUserController {
  sendOTP(data: { username: string }): Promise<void>;
  login(data: ILoginDto): Promise<{ token: string }>;
  logout(): Promise<void>;
  me(): Promise<IUser>;
}
