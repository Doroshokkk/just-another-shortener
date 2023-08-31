import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { getLinkDataFromDB } from '../services/resolveUrlService.js';

export const getFullUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422).json({
        status: 'failed',
        message: 'Query parameters validation failed',
        errors
      });
    }

    const linkRecord = await getLinkDataFromDB(req.query.link as string);

    if (linkRecord) {
      res.json({ status: 'success', message: `Data for ${req.query.link}`, data: linkRecord });
    } else {
      res.status(404).json({ status: 'failed', message: `Requested link ${req.query.link} not found` });
    }
  } catch (error) {
    console.log(error); //extend
    res.status(500).json({ status: 'error', message: 'internal server error', error: error });
  }

  // I suppose this one should also give some stats for this link at scale
  // otherwise it's pretty much useless
};
