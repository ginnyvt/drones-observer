import "dotenv/config";

import express from "express";
import cron from "node-cron";
import cors from "cors";
import "reflect-metadata";

import { fetchDrones } from "./jobs/fetchDrones.js";
import { transformDronesData } from "./jobs/transformDronesData.js";
import { flattenObject } from "./utils/flattenObject.js";
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

const connection = dataSource
	.initialize()
	.then(() => {
		console.log("Connection established.");
	})
	.catch((err) => {
		console.log(err);
		throw new Error("Connection error.");
	});

cron.schedule("*/2 * * * * *", async function () {
	const fetchedDrones = await fetchDrones(DRONES_DATA_URL);
	let violatedDrones = await transformDronesData(fetchedDrones);

	violatedDrones = violatedDrones.filter((d) => d.pilot !== null);

	if (violatedDrones.length > 0) {
		violatedDrones.forEach(async (d) => {
			const {
				snappedAt,
				serialNumber,
				positionX,
				positionY,
				distanceToTheNest,
				pilot_firstName,
				pilot_lastName,
				pilot_phoneNumber,
				pilot_email,
			} = flattenObject(d);
			const droneData = new ViolatedDrone(
				snappedAt,
				serialNumber,
				positionX,
				positionY,
				distanceToTheNest,
				pilot_firstName,
				pilot_lastName,
				pilot_phoneNumber,
				pilot_email
			);
			connection.then(() => {
				const repo = dataSource.getRepository("ViolatedDrone");
				repo
					.save(droneData)
					.then(() => {
						console.log("Inserted data successful.");
					})
					.catch((err) => {
						console.log(err);
						throw new Error("Inserted data error.");
					});
			});
		});
	}
	console.log("running a task every 2 seconds");
});

app.listen(PORT, () => {
	console.log("application listening at port: " + PORT);
});
