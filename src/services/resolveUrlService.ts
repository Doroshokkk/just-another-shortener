import UrlModel from '../models/urlModel';
import { PsqlError } from '../models/psqlError';

export async function getLinkDataFromDB(shortUrl: string) {
  try {
    const linkData = await UrlModel.findOne({ where: { shortUrl } });
    return linkData;
  } catch (error: any) {
    console.error(error);
    throw new PsqlError('error while retrieving link record from database', error);
  }
}
