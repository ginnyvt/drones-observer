import axios from "axios";

export const fetchPilotInfo = async (url, droneSerialNo) => {
	try {
		const { data } = await axios({
			method: "GET",
			url: `${url}/${droneSerialNo}`,
		});
		return data;
	} catch (err) {
		throw err;
	}
};
