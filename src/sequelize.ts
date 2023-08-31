import { Sequelize } from 'sequelize';

import config from './config.js';

const sequelize = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: 'postgres',
    dialect: config.database.dialect,
  }
);

export default sequelize;