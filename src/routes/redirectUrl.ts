import { Router } from 'express';

import { redirectUrl } from '../controllers/redirectUrlController';

const router = Router();

router.get('/:shortcode([a-zA-Z0-9]{6})',redirectUrl);

export default router;
