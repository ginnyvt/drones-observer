export const calculateDistance = (dronePositionX, dronePositionY, nestPositionX, nestPositionY) => {
	const xDiff = dronePositionX - nestPositionX;
	const yDiff = dronePositionY - nestPositionY;
	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
};
