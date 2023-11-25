import * as redisStore from 'cache-manager-ioredis';

export interface CacheConfig {
  store: typeof redisStore;
  host: string;
  port: string;
}

export const getCacheConfig = (): CacheConfig => ({
  store: redisStore,
  host: process.env.REDIS_HOST || '',
  port: process.env.REDIS_PORT || '',
});
