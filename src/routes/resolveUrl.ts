import { Router } from 'express';
import { check, query } from 'express-validator';

import { getFullUrl } from '../controllers/resolveUrlController.js';

const router = Router();

router.get('/resolve', [query('link').not().isEmpty()], getFullUrl);

export default router;
