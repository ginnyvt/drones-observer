USE drones_db;

CREATE TABLE IF NOT EXISTS `violated_drone` (
  snapped_at DATETIME NOT NULL,
  drone_serial_no VARCHAR(50) NOT NULL,
  drone_positionX NUMERIC(20,12) NOT NULL,
  drone_positionY NUMERIC(20,12) NOT NULL,
  distance_to_net NUMERIC(20,12) NOT NULL,
  pilot_firstName VARCHAR(50) NOT NULL, 
  pilot_lastName VARCHAR(50) NOT NULL,
  pilot_phone VARCHAR(50),
  pilot_email VARCHAR(50),
  PRIMARY KEY (snapped_at, drone_serial_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;