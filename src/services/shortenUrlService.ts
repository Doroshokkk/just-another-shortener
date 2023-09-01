import UrlModel from '../models/urlModel';
import { PsqlError } from '../models/psqlError';

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
      console.log(`Collision with ${shortUrl}`);
      return undefined
    } else {
      console.error(error.name);
      throw new PsqlError('error while uploading to database', error);
    }
  }
}

export async function removeLinkFromDB(shortUrl: string){
  try {
    const deletedCount = await UrlModel.destroy({
      where: { shortUrl: shortUrl }
    });

    if (deletedCount === 0) {
      console.log(`No record found with shortUrl: ${shortUrl}`);
      return false; // Indicate that no record was deleted
    }

    console.log(`Record with shortUrl: ${shortUrl} deleted successfully.`);
    return true; // Indicate that a record was deleted
  } catch (error: any) {
    console.error(`Error deleting record with shortUrl: ${shortUrl}`, error);
    throw new PsqlError('Error while deleting from the database', error);
  }
}