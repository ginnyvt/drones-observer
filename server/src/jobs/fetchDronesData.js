import axios from "axios";

export const fetchDrones = async (url) => {
	try {
		const { data } = await axios({
			url: url,
			method: "GET",
		});
		return data;
	} catch (err) {
		throw err;
	}
};
