import { fetchPilotInfo } from "./fetchPilotInfo.js";

const PILOT_DATA_URL = process.env.PILOT_DATA_URL;

export const assignPilotInfo = async (violatedDrones) => {
	return Promise.all(
		violatedDrones.map(async (d) => {
			try {
				const pilotInfo = await fetchPilotInfo(PILOT_DATA_URL, d.droneSerialNumber);
				return {
					...d,
					pilotFName: pilotInfo.firstName,
					pilotLName: pilotInfo.lastName,
					pilotPhone: pilotInfo.phoneNumber,
					pilotEmail: pilotInfo.email,
				};
			} catch (err) {
				console.error(err);
			}
		})
	);
};
