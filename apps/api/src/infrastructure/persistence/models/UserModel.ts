import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseModel } from './BaseModel';
import { IUser } from '@repo/type';
import { OrganizationEmployeeModel } from './OrganizationEmployeeModel';

@Entity({ name: 'user' })
export class UserModel extends BaseModel implements IUser {
  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'username', nullable: true, unique: true })
  username?: string;

  @Column({ name: 'password', nullable: true })
  password?: string;

  @Column({ name: 'first_name', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', nullable: true })
  lastName?: string;

  @Column({ name: 'phone', nullable: true })
  phone?: string;

  @Column({ name: 'avatar', nullable: true })
  avatar?: string;

  @Column({ name: 'last_login', nullable: true, type: 'timestamptz' })
  lastLogin?: Date;

  @OneToMany(() => OrganizationEmployeeModel, (employee) => employee.user)
  employees: OrganizationEmployeeModel[];
}
