export class ViolatedDrone {
	constructor(
		snapped_at,
		drone_serial_no,
		drone_positionX,
		drone_positionY,
		distance_to_nest,
		pilot_firstName,
		pilot_lastName,
		pilot_phone,
		pilot_email
	) {
		this.snapped_at = snapped_at;
		this.drone_serial_no = drone_serial_no;
		this.drone_positionX = drone_positionX;
		this.drone_positionY = drone_positionY;
		this.distance_to_nest = distance_to_nest;
		this.pilot_firstName = pilot_firstName;
		this.pilot_lastName = pilot_lastName;
		this.pilot_email = pilot_email;
		this.pilot_phone = pilot_phone;
	}
}
