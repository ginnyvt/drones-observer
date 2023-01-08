import { EntitySchema } from "typeorm";

export const ViolatedDroneSchema = new EntitySchema({
	name: "ViolatedDrone",
	tableName: "violated_drone",
	columns: {
		snapped_at: {
			primary: true,
			type: "datetime",
		},
		drone_serial_no: {
			primary: true,
			type: "varchar",
			length: 50,
		},
		drone_positionX: {
			type: "numeric",
			precision: 20,
			scale: 12,
		},
		drone_positionY: {
			type: "numeric",
			precision: 20,
			scale: 12,
		},
		distance_to_nest: {
			type: "numeric",
			precision: 20,
			scale: 12,
		},
		pilot_firstName: {
			type: "varchar",
			length: 50,
		},
		pilot_lastName: {
			type: "varchar",
			length: 50,
		},
		pilot_phone: {
			type: "varchar",
			length: 50,
			nullable: true,
		},
		pilot_email: {
			type: "varchar",
			length: 50,
			nullable: true,
		},
	},
});
