import { Router } from "express";
import droneController from "../controllers/drone.controller.js";
const router = Router();

router.get("/violated_drones", droneController.getViolatedDrones);

export default router;
