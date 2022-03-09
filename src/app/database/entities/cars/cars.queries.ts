import { Car } from './car.entity';

export const INSERT_CAR = (newCar: Car) =>
  `INSERT INTO Cars VALUES ('${newCar.carNumber}');`;

export const COUNT = `SELECT count(*) FROM Cars;`;
