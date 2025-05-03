import { IBaseEntity } from './base/IBaseEntity';
import { IOrganization } from './IOrganization';
import { IOrganizationEmployee } from './IOrganizationEmployee';

export interface IOrganizationRole extends IBaseEntity {
  name: string;
  description: string;

  organization: IOrganization;
  employees: IOrganizationEmployee[];
}
