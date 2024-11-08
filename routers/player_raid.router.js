import express from 'express';

import { getPlayerRaid, createPlayerRaid, deletePlayerRaid, updatePlayerRaid } from '../controllers/player_raid.controller';
const router = express.Router();

router.get('/getplayerraid', getPlayerRaid);
router.delete('/deleteplayerraid/:id', deletePlayerRaid);
router.put('/updateplayerraid/:id', updatePlayerRaid);
router.post('/createplayerraid', createPlayerRaid);

export default router;