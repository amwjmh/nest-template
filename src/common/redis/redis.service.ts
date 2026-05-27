import { OnModuleDestroy, Injectable, Inject } from "@nestjs/common";
import type { Redis, ChainableCommander } from "ioredis";

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject("REDIS_CLIENT") private readonly redisClient: Redis) {
  }

  async onModuleDestroy() {
    if (this.redisClient) {
      await this.redisClient.disconnect();
    }
  }

  async set(key: string, value: string, ttl: number = 60) {
    if (ttl) {
      await this.redisClient.setex(key, ttl, value);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async del(key: string) {
    await this.redisClient.del(key);
  }

  async exists(key: string) {
    const exists = await this.redisClient.exists(key);
    return exists === 1;
  }

  async expire(key: string, ttl: number) {
    await this.redisClient.expire(key, ttl);
  }

  async getObject<T>(key: string) {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value as string) : null;
  }

  async setObject<T>(key: string, value: T, ttl?: number) {
    await this.set(key, JSON.stringify(value), ttl);
  }

  async increment(key: string, amount = 1) {
    await this.redisClient.incrby(key, amount);
  }

  async decrement(key: string, amount = 1) {
    await this.redisClient.decrby(key, amount);
  }

  async pipeline(operations: (pipeline: ChainableCommander) => void) {
    const pipeline = await this.redisClient.pipeline();
    operations(pipeline);
    await pipeline.exec();
  }

  async publish(channel: string, message: string) {
    await this.redisClient.publish(channel, message);
  }

  getClient() {
    return this.redisClient;
  }
}
