import { Injectable } from '@nestjs/common';
import { BaseRepository } from './BaseRepository';
import { UserModel } from '../persistence/models/UserModel';
import { IUser } from '@repo/type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from 'src/domain/repositories/IUserRepository';

@Injectable()
export class UserRepository extends BaseRepository<UserModel> implements IUserRepository {
  constructor(
    @InjectRepository(UserModel)
    repository: Repository<UserModel>,
  ) {
    super(repository);
  }

  findByUsernameAndHashPassword(username: string, hashPassword: string): Promise<IUser | null> {
    return this.getRepository().findOne({ where: { username, password: hashPassword } });
  }
}
