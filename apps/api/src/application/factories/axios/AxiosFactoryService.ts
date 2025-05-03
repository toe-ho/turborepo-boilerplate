import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { HttpLogModel } from 'src/infrastructure/persistence/models/HttpLogModel';
import { Repository } from 'typeorm';

@Injectable()
export class AxiosFactoryService {
  constructor(
    @InjectRepository(HttpLogModel)
    private readonly httpLogRepository: Repository<HttpLogModel>,
  ) {}

  create(serviceName: string, baseURL: string): AxiosInstance {
    const instance = axios.create({ baseURL });

    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      (config as any).metadata = { startTime: new Date() };
      return config;
    });

    // ✅ Response interceptor
    instance.interceptors.response.use(
      async (response: AxiosResponse) => {
        const startTime = (response.config as any).metadata?.startTime || new Date();
        const duration = new Date().getTime() - startTime.getTime();

        await this.httpLogRepository.save({
          service: serviceName,
          key: response.config.headers?.['X-Request-Key'],
          user: '',
          url: response.config.url,
          method: response.config.method?.toUpperCase(),
          body: JSON.stringify(response.config.data || {}),
          query: JSON.stringify(response.config.params || {}),
          params: '',
          responseTime: duration,
          responseCode: response.status,
          responseBody: JSON.stringify(response.data),
        });

        return response;
      },
      async (error) => {
        const config = error.config || {};
        const startTime = config.metadata?.startTime || new Date();
        const duration = new Date().getTime() - startTime.getTime();

        await this.httpLogRepository.save({
          service: serviceName,
          key: config.headers?.['X-Request-Key'],
          user: '',
          url: config.url,
          method: config.method?.toUpperCase(),
          body: JSON.stringify(config.data || {}),
          query: JSON.stringify(config.params || {}),
          params: '',
          responseTime: duration,
          responseCode: error.response?.status || 500,
          responseBody: this.safeJson(error.response?.data || error.message),
        });

        return Promise.reject(error);
      },
    );

    return instance;
  }

  private safeJson(input: any, maxLength = 1000): string {
    try {
      return JSON.stringify(input).substring(0, maxLength);
    } catch {
      return '[Unserializable]';
    }
  }
}
