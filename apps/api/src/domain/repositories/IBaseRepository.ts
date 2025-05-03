import {
  DeepPartial,
  ObjectLiteral,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  UpdateResult,
  DeleteResult,
} from 'typeorm';

export interface IBaseRepository<T extends ObjectLiteral, ID = number | string> {
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findById(id: ID, options?: FindOneOptions<T>): Promise<T | null>;
  findOne(criteria: FindOptionsWhere<T>, options?: FindOneOptions<T>): Promise<T | null>;
  findMany(criteria: FindOptionsWhere<T>, options?: FindManyOptions<T>): Promise<T[]>;
  create(data: DeepPartial<T>): Promise<T>;
  update(criteria: ID | FindOptionsWhere<T>, partialEntity: DeepPartial<T>): Promise<UpdateResult>;
  delete(criteria: ID | FindOptionsWhere<T>): Promise<DeleteResult>;
  createMany(data: DeepPartial<T>[]): Promise<T[]>;
}
