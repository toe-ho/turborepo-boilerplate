import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { IOrganizationRole } from '@repo/type';
import { OrganizationModel } from './OrganizationModel';  
import { OrganizationEmployeeModel } from './OrganizationEmployeeModel';

@Entity({ name: 'organization_role' })
export class OrganizationRoleModel extends BaseModel implements IOrganizationRole {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @ManyToOne(() => OrganizationModel, (organization) => organization.roles)
  @JoinColumn({ name: 'organization_id' })
  organization: OrganizationModel;

  @OneToMany(() => OrganizationEmployeeModel, (employee) => employee.role)
  employees: OrganizationEmployeeModel[];
}
