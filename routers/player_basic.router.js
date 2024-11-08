import express from "express";

import { getPlayers, createPlayer, deletePlayer, getPlayer, updatePlayer, getPlayerWithAllData } from "../controllers/player_basic.controller";

const router = express.Router();

router.get("/getPlayers", getPlayers);
router.post("/createPlayer", createPlayer);
router.delete("/deletePlayer/:id", deletePlayer);
router.get("/getPlayer/:id", getPlayer);
router.put("/updatePlayer/:id", updatePlayer);
router.get("/getplayercombinedata", getPlayerWithAllData);

export default router;