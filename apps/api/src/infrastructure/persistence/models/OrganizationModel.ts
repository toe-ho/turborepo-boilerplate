import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { OrganizationType } from '@repo/type';
import { IOrganization } from '@repo/type';
import { OrganizationRoleModel } from './OrganizationRoleModel';

@Entity({ name: 'organization' })
export class OrganizationModel extends BaseModel implements IOrganization {
  @Column({ name: 'name', unique: true, nullable: false })
  name: string;

  @Column({ name: 'type', type: 'enum', enum: OrganizationType, nullable: false })
  type: OrganizationType;

  @OneToMany(() => OrganizationRoleModel, (role) => role.organization)
  roles: OrganizationRoleModel[];

  @ManyToOne(() => OrganizationModel, (organization) => organization.parent)
  @JoinColumn({ name: 'parent_id' })
  parent?: OrganizationModel;

  @ManyToOne(() => OrganizationModel, (organization) => organization.printerOf)
  @JoinColumn({ name: 'connect_to_printer_id' })
  connectToPrinter?: OrganizationModel;

  @OneToMany(() => OrganizationModel, (organization) => organization.connectToPrinter)
  printerOf?: OrganizationModel[];

}
