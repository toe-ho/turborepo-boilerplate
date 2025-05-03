import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import { IOrganizationEmployee } from '@repo/type';
import { OrganizationRoleModel } from './OrganizationRoleModel';
import { UserModel } from './UserModel';
@Entity({ name: 'organization_employee' })
export class OrganizationEmployeeModel extends BaseModel implements IOrganizationEmployee {
  @ManyToOne(() => UserModel, (user) => user.employees)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @ManyToOne(() => OrganizationRoleModel, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: OrganizationRoleModel;
}
