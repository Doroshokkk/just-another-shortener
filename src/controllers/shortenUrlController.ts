import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { generateShortCode, addLinkToDB } from '../services/shortenUrlService';
import sequelize from '../sequelize';
import UrlMapping from '../models/urlModel';
import config from '../config';

export const createShortenedUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422).json({
        status: 'failed',
        message: 'Body validation failed',
        errors
      });
      return;
    }
    //if we're willing to handle high loads where we have 10000+ RPS,
    //I'd rather have validation on frontend, before sending request to backend
    //It's not taking a lot of time, but still can be significant with such traffic
    //but I'll just have it for now

    const domain = process.env.DOMAIN || 'localhost:3000';

    let addedItem: undefined | UrlMapping = undefined;
    let code: string = '';
    let retryCount = 0;
    const RETRY_LIMIT = 10;

    //try to generate a unique code
    //when we get a "SequelizeUniqueConstraintError" we know that code was no unique
    //so we can retry generating
    //it saves a whole get request to the database and likely cuts time and usage
    //almost in half for each create request

    while (!addedItem && retryCount < RETRY_LIMIT) {
      console.time('generate code');
      code = generateShortCode(config.short_link_symbols);
      console.timeEnd('generate code');
      console.log(code);
      addedItem = await addLinkToDB(req.body.link, `${domain}/${code}`);
      retryCount++;
    }

    if (retryCount === RETRY_LIMIT) {
      res.status(409).json({
        status: 'failed',
        message: `failed to generate a link with unique code. Need to extend the pool`
      });
      return;
    }

    res.json({
      status: 'success',
      message: 'link successfully shortened',
      data: `${domain}/${code}`
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ status: 'error', message: 'internal server error', error: error });
  }
};
