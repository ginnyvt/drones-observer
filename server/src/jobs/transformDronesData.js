import { calculateDistance } from "../utils/calculateDistance.js";
import { fetchPilotInfo } from "../jobs/fetchPilotInfo.js";
import moment from "moment";

const PILOT_DATA_URL = process.env.PILOT_DATA_URL;
const NEST_POSITION_X = process.env.NEST_POSITION_X;
const NEST_POSITION_Y = process.env.NEST_POSITION_Y;
const VIOLATED_ZONE = process.env.VIOLATED_ZONE;

export const transformDronesData = (dronesData) => {
	const transformedDrones = dronesData.drones.map(async ({ serialNumber, positionX, positionY }) => {
		const distanceToTheNest = calculateDistance(positionX, positionY, NEST_POSITION_X, NEST_POSITION_Y);
		const isViolated = distanceToTheNest <= VIOLATED_ZONE ? true : false;
		const dtFormat = "YYYY-MM-DD HH:mm:ss";
		let pilot = null;

		if (isViolated) {
			try {
				pilot = await fetchPilotInfo(PILOT_DATA_URL, serialNumber);
			} catch (err) {
				console.log(err);
				throw new Error(err.response.data);
			}
		}
		return {
			snappedAt: moment.utc(dronesData.snappedAt).format(dtFormat),
			serialNumber,
			positionX: +positionX,
			positionY: +positionY,
			distanceToTheNest,
			pilot,
		};
	});

	return Promise.all(transformedDrones);
};
