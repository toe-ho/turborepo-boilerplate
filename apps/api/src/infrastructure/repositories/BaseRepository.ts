import { IBaseRepository } from 'src/domain/repositories/IBaseRepository';
import {
  ObjectLiteral,
  Repository,
  EntityManager,
  FindManyOptions,
  FindOptionsWhere,
  FindOneOptions,
  UpdateResult,
  DeleteResult,
  DeepPartial,
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral, ID = number | string> implements IBaseRepository<T, ID> {
  constructor(private readonly repository: Repository<T>) {}

  public getRepository(transactionManager?: EntityManager): Repository<T> {
    return transactionManager ? transactionManager.getRepository(this.repository.target) : this.repository;
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findById(id: ID): Promise<T | null> {
    return this.repository.findOneBy({ id } as any);
  }

  async findOne(criteria: FindOptionsWhere<T>, options?: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne({ where: criteria, ...options });
  }

  async findMany(criteria: FindOptionsWhere<T>, options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find({ where: criteria, ...options });
  }

  async create(data: DeepPartial<T>, transactionManager?: EntityManager): Promise<T> {
    const repo = this.getRepository(transactionManager);
    const entity = repo.create(data);
    return repo.save(entity);
  }

  async createMany(data: DeepPartial<T>[], transactionManager?: EntityManager): Promise<T[]> {
    const repo = this.getRepository(transactionManager);
    const entities = repo.create(data);
    return repo.save(entities);
  }

  async update(
    criteria: ID | FindOptionsWhere<T>,
    data: DeepPartial<T>,
    transactionManager?: EntityManager,
  ): Promise<UpdateResult> {
    const repo = this.getRepository(transactionManager);
    return repo.update(criteria as any, data as any);
  }

  async delete(criteria: ID | FindOptionsWhere<T>, transactionManager?: EntityManager): Promise<DeleteResult> {
    const repo = this.getRepository(transactionManager);
    return repo.delete(criteria as any);
  }
}
