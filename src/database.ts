import { Sequelize, DataTypes, QueryTypes } from 'sequelize';
import { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } from './config';

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'mssql',
});

export { sequelize, QueryTypes };
