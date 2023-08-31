import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';

class UrlMapping extends Model {
  public id!: string;
  public originalUrl!: string;
  public shortCode!: string;
  public userId?: string;
  public expirationTime?: string;
}

UrlMapping.init(
  {
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortUrl: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expirationTime:{
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'UrlMapping',
  }
);

export default UrlMapping;