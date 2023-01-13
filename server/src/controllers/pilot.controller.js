import { dataSource } from "../utils/datasource.js";

export const getPilots = async (req, res) => {
	const queryRunner = dataSource.createQueryRunner();

	const violatedPilots = await queryRunner.manager.query(`
	SELECT vd1.* FROM violated_drone AS vd1
	JOIN (
  SELECT MIN(distance_to_nest) AS min_distance, drone_serial_no FROM violated_drone 
  GROUP BY drone_serial_no 
  ) AS vd2 ON vd2.drone_serial_no = vd1.drone_serial_no 
  AND vd2.min_distance = vd1.distance_to_nest
  WHERE snapped_at >= NOW() - INTERVAL 10 MINUTE;
	`);

	res.status(200).json({
		message: "Succeeded",
		data: violatedPilots,
	});
};

export const getPilot = (pId) => {};

export default { getPilot, getPilots };
