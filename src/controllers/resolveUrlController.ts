import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { getLinkDataFromDB } from '../services/resolveUrlService';

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
      return;
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
  // also not doing caching for this one cause I think I missed the point and the right thing to do was redirect
  // if this endpoint has a chance to become useful it should return stats about the link
  // which implies a database request, so... no point right now
};
