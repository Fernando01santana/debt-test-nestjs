import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export default class RedisOtherService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async createKey(data: any): Promise<any> {
    this.redis.set(`customer}`, JSON.stringify(data));
  }

  async findCustomerByDocument(data: string): Promise<any> {
    const customer = await this.redis.get(`customer:${data}`);
    return customer;
  }

  async getAllCustomers(): Promise<string[]> {
    const customerKeys = await this.redis.keys('customer');
    if (customerKeys.length === 0) {
      return;
    }

    return await this.redis.mget(...customerKeys);
  }

  async getDebtsByDocument(data: string): Promise<string[]> {
    const customerKeys = await this.redis.keys(`debt-${data}*`);
    if (customerKeys.length === 0) {
      return;
    }

    return await this.redis.mget(...customerKeys);
  }
}
