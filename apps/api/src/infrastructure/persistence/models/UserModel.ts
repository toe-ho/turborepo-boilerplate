import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { IUser, LoginType } from '@repo/type';
import { OrganizationEmployeeModel } from './OrganizationEmployeeModel';

@Entity({ name: 'user' })
export class UserModel extends BaseModel implements IUser {
  @Column({ name: 'username', nullable: false })
  username: string;

  @Column({ type: 'enum', enum: LoginType, name: 'login_type', nullable: false })
  loginType: LoginType;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'last_login', nullable: true, type: 'timestamptz' })
  lastLogin: Date;

  @OneToMany(() => OrganizationEmployeeModel, (employee) => employee.user)
  employees: OrganizationEmployeeModel[];
}
