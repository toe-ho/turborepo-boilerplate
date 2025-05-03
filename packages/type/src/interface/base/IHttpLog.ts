import { IBaseEntity } from "./IBaseEntity";

export interface IHttpLog extends IBaseEntity {
  user?: string;
  url: string;
  method: string;
  body: string;
  query: string;
  params: string;
  responseTime: number;
  responseCode: number;
  responseBody: string;
}
