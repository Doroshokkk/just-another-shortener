import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { generateShortCode } from '../services/shortenUrlService.js';

export const createShortenedUrl = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({       
      status: 'failed',
      message: 'Body validation failed',
      errors 
    });
  }
  //if we're willing to handle high loads where we have 100000+ RPS,
  //I'd rather have validation on frontend, before sending request to backend
  //It's not taking a lot of time, but still can be significant with such traffic
  //but I'll just have it for now

  const domain = process.env.DOMAIN || 'localhost:3000';
  const code = generateShortCode(6); 
  console.log(code)
  res.json({ message: `${domain}/${code}` });
};
