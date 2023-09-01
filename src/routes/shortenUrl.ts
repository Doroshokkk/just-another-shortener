import { Router } from 'express';
import { check } from 'express-validator';

import { createShortenedUrl } from '../controllers/shortenUrlController';

const router = Router();

router.post('/shorten', [check('link').isURL()], createShortenedUrl);

export default router;
