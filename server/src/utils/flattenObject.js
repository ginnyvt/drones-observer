export const flattenObject = (ob) => {
	let result = {};
	for (const key in ob) {
		if (!ob.hasOwnProperty(key)) {
			continue;
		}
		if (typeof ob[key] === "object" && !Array.isArray(ob[key])) {
			var subFlatObject = flattenObject(ob[key]);
			for (const subkey in subFlatObject) {
				result[key + "_" + subkey] = subFlatObject[subkey];
			}
		} else {
			result[key] = ob[key];
		}
	}
	return result;
};
