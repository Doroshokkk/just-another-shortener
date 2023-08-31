import dotenv from 'dotenv';

dotenv.config()

interface AppConfig {
    port: number;
    database: {
      dialect: 'postgres' | 'mysql';
      host: string;
      port: number;
      username: string;
      password: string;
      database: string;
    };
    redis: {
      host: string;
      port: number;
    };
  }
  
  const config: AppConfig = {
      port: parseInt(process.env.PORT||'3000'),
      database: {
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'username',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'mydatabase',
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    },
  };
  
  export default config;