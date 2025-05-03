import { LoginType } from "../enum/LoginType";
import { IBaseEntity } from "./base/IBaseEntity";

export interface IUser extends IBaseEntity {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  loginType: LoginType;
  lastLogin: Date;
}
