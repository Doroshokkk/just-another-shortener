import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';

class UrlMapping extends Model {
  public id!: number;
  public originalUrl!: string;
  public shortCode!: string;
}

UrlMapping.init(
  {
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortCode: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UrlMapping',
  }
);

export default UrlMapping;