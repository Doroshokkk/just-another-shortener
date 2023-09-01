import UrlModel from '../models/urlModel';
import { PsqlError } from '../models/psqlError';
import redisClient from '../redisClient';
import config from '../config';

interface LinkData {
  originalUrl: string;
  shortUrl: string;
}

export async function getLinkFromDB(shortcode: string) {
  try {
    const shortUrl = `${config.domain}/${shortcode}`
    const linkData = await UrlModel.findOne({ where: { shortUrl } });
    return linkData;
  } catch (error: any) {
    console.error(error);
    throw new PsqlError('error while retrieving link record from database', error);
  }
}

export async function getLinkFromRedis(shortcode: string) {
  try {
    const recordValue = await redisClient.get(shortcode);
    return recordValue;
  } catch (error) {
    console.log(error)
    throw new PsqlError('error while retrieving link from Redis', error)
  }
}

export async function refreshTTL(key: string, ttl: number) {
  try {
    const updatedTTL = redisClient.expire(key, ttl);
    return updatedTTL;
  } catch (error) {
    console.log(error)
    throw new PsqlError('error while prolonging TTL for link', error)
  }
}

export async function setRecordToRedis(key: string, originalUrl: string, shortUrl: string, ttl: number) {
  try {
    const data: LinkData = {
      originalUrl,
      shortUrl
    }
    const serializedData = JSON.stringify(data);
    const record = redisClient.setex(key, ttl, serializedData);
    return record;
  } catch (error) {
    console.log(error)
    throw new PsqlError('error while prolonging TTL for link', error)
  }
}