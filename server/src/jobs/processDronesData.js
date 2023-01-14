import moment from "moment";
import xml2js from "xml2js";
import { calculateDistance } from "../utils/calculateDistance.js";

const NEST_POSITION_X = process.env.NEST_POSITION_X;
const NEST_POSITION_Y = process.env.NEST_POSITION_Y;
const VIOLATED_ZONE = process.env.VIOLATED_ZONE;

const dtFormat = "YYYY-MM-DD HH:mm:ss";
const xmlParser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });

export const transformDrones = (dronesData) => {
	return dronesData.drones.map(({ serialNumber, positionX, positionY }) => {
		const distanceToTheNest = calculateDistance(positionX, positionY, NEST_POSITION_X, NEST_POSITION_Y);

		return {
			snappedAt: moment.utc(dronesData.snappedAt).format(dtFormat),
			serialNumber,
			positionX: +positionX,
			positionY: +positionY,
			distanceToTheNest,
		};
	});
};

export const filterDrones = (tDrones) => {
	return tDrones.filter((d) => d.distanceToTheNest <= VIOLATED_ZONE);
};

export const processDronesData = async (dronesData) => {
	try {
		// parsed XML data to json
		const parsedData = await xmlParser.parseStringPromise(dronesData);

		// calculate distance to the nest
		const drones = parsedData.report.capture.drone.map((d) => {
			const dronePositionX = +d.positionX;
			const dronePositionY = +d.positionY;
			const distanceToTheNest = calculateDistance(dronePositionX, dronePositionY, NEST_POSITION_X, NEST_POSITION_Y);
			const snappedAt = moment.utc(parsedData.report.capture.snapshotTimestamp).format(dtFormat);
			return {
				snappedAt,
				droneSerialNumber: d.serialNumber,
				dronePositionX,
				dronePositionY,
				distanceToTheNest,
				pilotFName: null,
				pilotLName: null,
				pilotPhone: null,
				pilotEmail: null,
			};
		});
		//filter violated drones
		return drones.filter((d) => d.distanceToTheNest <= VIOLATED_ZONE);
	} catch (err) {
		throw err;
	}
};
