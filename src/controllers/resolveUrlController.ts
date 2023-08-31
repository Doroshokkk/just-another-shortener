import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';


export const getFullUrl = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req); 
  console.log(req.query)
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({       
      status: 'failed',
      message: 'Query parameters validation failed',
      errors
    });
  }

  //there should be some logic to get link from DB, and gotta be sure there are no injections
  res.json({ status: 'success', message: `there will be a link ${req.query.link}` });

  // I suppose this one should also give some stats for this link at scale
  // otherwise it's pretty much useless
};
