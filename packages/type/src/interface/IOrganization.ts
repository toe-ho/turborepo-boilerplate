import { IBaseEntity } from "./base/IBaseEntity";
import { OrganizationType } from "../enum/OrganizationTypeEnum";
import { IOrganizationRole } from "./IOrganizationRole";


export interface IOrganization extends IBaseEntity {
  parent?: IOrganization;
  name: string;
  type: OrganizationType;

  roles: IOrganizationRole[];
}
