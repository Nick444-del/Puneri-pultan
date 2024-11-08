import express from 'express';

import { getplayedData, createPlayedData, deletePlayedData, getPlayedDataById } from '../controllers/overall_played.controller.js';

const router = express.Router();

router.get('/getplayedData', getplayedData);
router.post('/createPlayedData', createPlayedData);
router.delete('/deletePlayedData/:id', deletePlayedData);
router.get('/getPlayedDataById/:id', getPlayedDataById);

export default router