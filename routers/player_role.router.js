import express from "express";

import { getPlayerRole, createPlayerRole, deletePlayerRole, getPlayerRoleById, updatePlayerRole } from "../controllers/player_role.controller.js";

const router = express.Router();

router.get("/getPlayerRole", getPlayerRole);
router.post("/createPlayerRole", createPlayerRole);
router.delete("/deletePlayerRole/:id", deletePlayerRole);
router.get("/getPlayerRoleById/:id", getPlayerRoleById);
router.put("/updatePlayerRole/:id", updatePlayerRole);

export default router;