import { Router } from "express";
import pilotController from "../controllers/pilot.controller.js";
const router = Router();

router.get("/pilots", pilotController.getPilots);

export default router;
