import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class UrlMapping extends Model {
  public id!: string;
  public originalUrl!: string;
  public shortUrl!: string;
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
    modelName: 'UrlMapping', //now that I think of it more, I'd rather use a name like UrlsData (without -s at the end for table name)
  }
);

export default UrlMapping;