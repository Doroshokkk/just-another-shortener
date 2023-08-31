import UrlModel from '../models/urlModel.js';
import { PsqlError } from '../models/psqlError.js';

export function generateShortCode(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let shortCode = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortCode += characters.charAt(randomIndex);
  }

  return shortCode;
}

export async function addLinkToDB(originalUrl: string, shortUrl: string, ttl?: string, userId?: string) {
  try {
    console.time('set created url to psql');
    const createdItem = await UrlModel.create({
      originalUrl: originalUrl,
      shortUrl: shortUrl
    });
    console.timeEnd('set created url to psql');
    return createdItem;
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.log(`collision with ${shortUrl}`);
      return undefined
    } else {
      console.error(error.name);
      throw new PsqlError('error while uploading to database', error);
    }
  }
}
