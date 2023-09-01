import Redis from 'ioredis';

import config from './config';

const redisClient = new (Redis as any)({ //had to use a workaround, for some reason TS didn't recognize Redis a constructable
  host: 'redis',
  port: config.redis.port
});

export default redisClient;
