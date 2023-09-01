import dotenv from 'dotenv';

dotenv.config();

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
  short_link_symbols: number;
  domain: string;
}

const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000'),
  database: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'myuser',
    password: process.env.DB_PASSWORD || 'mypassword',
    database: process.env.DB_NAME || 'mydatabase'
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379')
  },
  short_link_symbols: 6,
  domain: 'localhost:3000'
};

export default config;
