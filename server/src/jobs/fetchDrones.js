import xml2js from "xml2js";
import axios from "axios";

const xmlParser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });

export const fetchDrones = async (url) => {
	try {
		const { data } = await axios({
			url: url,
			method: "GET",
		});
		const parsedData = await xmlParser.parseStringPromise(data);
		return {
			drones: parsedData.report.capture.drone,
			snappedAt: parsedData.report.capture.snapshotTimestamp,
		};
	} catch (err) {
		throw new Error(err.response.data);
	}
};
