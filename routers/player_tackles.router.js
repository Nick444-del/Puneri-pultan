import express from 'express';

import { getTackle, createTackle } from '../controllers/player_tackles.controller';

const router = express.Router();

router.get('/getTackle', getTackle);
router.post('/createTackle', createTackle);

export default router;

