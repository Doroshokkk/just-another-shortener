import { Request, Response, NextFunction } from 'express';

import { getLinkFromDB, getLinkFromRedis, refreshTTL, setRecordToRedis } from '../services/redirectUrlService';

export const redirectUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let ttl = 24 * 60 * 60; // 24 hours - idk it should probably belong to config, but I asuume
    // we'll want to calculate it dynamically at some point, so for now it'll be as a var

    const shortcode = req.params.shortcode;

    const cachedLink = await getLinkFromRedis(shortcode);

    if (cachedLink) {
      //if link is in cache (means it's been triggered not so long ago)
      const deserializedData = JSON.parse(cachedLink);
      console.log('deserializedData', deserializedData);
      console.time('ttl reset');
      await refreshTTL(shortcode, ttl); //we refresh its ttl (in terms of performance, it might be faster to use ' ttl "key" ' command and only updating if there's less then 1h left, but this requires some benchmarking done)
      console.timeEnd('ttl reset');
      res.redirect(`${deserializedData.originalUrl}`);
      return; //and we don't need anything else
    }

    const linkData = await getLinkFromDB(shortcode);

    if (linkData) {
      //well this one's easy, we look up the link, we set it in cache
      console.time('set to redis');
      const setRecord = await setRecordToRedis(shortcode, linkData.originalUrl, linkData.shortUrl, ttl);
      console.timeEnd('set to redis');
      console.log(setRecord);
      res.redirect(`${linkData.originalUrl}`);
    } else {
      const customHTML = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Link not found</title>
          </head>
          <body>
              <h1>The link that you've entered does not exist. Maybe it has expired, or you made a typo</h1>
          </body>
          </html>
        `;
      res.setHeader('Content-Type', 'text/html');
      res.status(404).send(customHTML);
      //res.status(404).json({ status: 'failed', message: `Requested link ${req.originalUrl} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: 'internal server error', error: error });
  }
};
