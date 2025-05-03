import { IOrganizationRole } from "./IOrganizationRole";
import { IUser } from "./IUser";
import { IBaseEntity } from "./base/IBaseEntity";


export interface IOrganizationEmployee extends IBaseEntity {
  user: IUser;
  role: IOrganizationRole;
}
