import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { IUserService } from '../interface/IUserService';
import { IUser } from '@repo/type';
import { JwtService } from '@nestjs/jwt';
import { appConfig } from 'src/config/AppConfig';
import { UserRepository } from 'src/infrastructure/repositories/UserRepository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async sendOTP({ username }: { username: string }): Promise<void> {
    const user = await this.repository.findOne({ username: username.toLowerCase().trim() });
    if (!user) throw new NotFoundException(`User with username ${username} does not exist`);
  }

  async login({ otp, username }: { username: string; otp: string }): Promise<{ token: string }> {
    console.log({ otp, username });
    return { token: 'token' };
  }

  async get(userId: number): Promise<IUser> {
    const user = await this.repository.findOne(
      { id: userId },
      { relations: ['employees', 'employees.role', 'employees.role.organization'] },
    );
    if (!user) throw new NotFoundException(`User with id ${userId} does not exist`);
    user.employees = user.employees.filter((employee) => employee.role && employee.role.organization);
    return user;
  }

  logout(): Promise<void> {
    return Promise.resolve();
  }
}
