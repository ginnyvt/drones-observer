import "dotenv/config";

import express from "express";
import cron from "node-cron";
import cors from "cors";
import "reflect-metadata";

import droneRoutes from "./routes/drone.route.js";
import { fetchDrones } from "./jobs/fetchDronesData.js";
import { assignPilotInfo } from "./jobs/assignPilotInfo.js";
import { processDronesData } from "./jobs/processDronesData.js";

import { dataSource } from "./utils/datasource.js";
import { ViolatedDrone } from "./models/ViolatedDrone.js";

const DRONES_DATA_URL = process.env.DRONES_DATA_URL;
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send("Hello from express server!");
});

app.use("/api", droneRoutes);

(async () => {
	// connect db
	try {
		await dataSource.initialize();
	} catch (err) {
		throw err;
	}

	// start application
	app.listen(PORT, () => {
		console.log("application listening at port: " + PORT);
	});

	// cron jobs
	cron.schedule("*/2 * * * * *", async function () {
		console.time("Fetching");
		try {
			// fetch drones data
			const dronesData = await fetchDrones(DRONES_DATA_URL);

			// process drones data
			let violatedDrones = await processDronesData(dronesData);
			// assigned pilot info
			violatedDrones = await assignPilotInfo(violatedDrones);
			// insert violated drones data to db
			violatedDrones = violatedDrones.map((d) => {
				const droneData = new ViolatedDrone();
				droneData.drone_serial_no = d.droneSerialNumber;
				droneData.snapped_at = d.snappedAt;
				droneData.drone_positionX = d.dronePositionX;
				droneData.drone_positionY = d.dronePositionY;
				droneData.distance_to_nest = d.distanceToTheNest;
				droneData.pilot_firstName = d.pilotFName;
				droneData.pilot_lastName = d.pilotLName;
				droneData.pilot_phone = d.pilotPhone;
				droneData.pilot_email = d.pilotEmail;
				return droneData;
			});

			const repo = dataSource.getRepository("ViolatedDrone");
			try {
				if (violatedDrones.length > 0) {
					await repo.save(violatedDrones);
					console.info("Inserted :" + violatedDrones.length);
				}
			} catch (err) {
				console.log(err);
			}
		} catch (err) {
			console.error(err);
		}
		console.timeEnd("Fetching");
	});

	cron.schedule("*/1 * * * *", async function () {
		console.time("Deleting");
		try {
			await dataSource.query(`
			DELETE FROM violated_drone
			WHERE snapped_at < NOW() - INTERVAL 2 MINUTE`);
			console.log("Delete drones data after 1 minutes");
		} catch (err) {
			console.log(err);
		}
		console.timeEnd("Deleting");
	});
})();
