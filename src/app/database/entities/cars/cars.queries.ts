import { Car } from './car.entity';

export const INSERT_CAR = (newCar: Car) =>
  `SELECT * FROM public.insert_car('${newCar.carNumber}')`;
