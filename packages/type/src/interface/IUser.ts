import { IBaseEntity } from "./base/IBaseEntity";

export interface IUser extends IBaseEntity {
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  lastLogin?: Date;
  phone?: string;
  avatar?: string;
}
