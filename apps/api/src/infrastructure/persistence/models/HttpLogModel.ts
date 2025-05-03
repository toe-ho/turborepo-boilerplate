import { Entity, Column, Index } from 'typeorm';
import { IHttpLog } from '@repo/type';
import { BaseModel } from './BaseModel';

@Entity({ name: 'http_log' })
@Index(['service'])
@Index(['key'])
@Index(['createdAt'])
export class HttpLogModel extends BaseModel implements IHttpLog {
  @Column({ name: 'service', type: 'varchar', length: 100, nullable: false })
  service: string;

  @Column({ name: 'key', type: 'varchar', length: 100, nullable: true })
  key?: string;

  @Column({ name: 'user', type: 'varchar', length: 100, nullable: true })
  user?: string;

  @Column({ name: 'url', type: 'varchar', length: 1000, nullable: false })
  url: string;

  @Column({ name: 'method', type: 'varchar', length: 10, nullable: false })
  method: string;

  @Column({ name: 'body', type: 'text', nullable: true })
  body: string;

  @Column({ name: 'query', type: 'text', nullable: true })
  query: string;

  @Column({ name: 'params', type: 'text', nullable: true })
  params: string;

  @Column({ name: 'response_time', type: 'int', nullable: false })
  responseTime: number;

  @Column({ name: 'response_code', type: 'int', nullable: false })
  responseCode: number;

  @Column({ name: 'response_body', type: 'text', nullable: true })
  responseBody: string;
}
