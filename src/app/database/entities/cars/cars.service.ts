import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { Car } from './car.entity';
import { INSERT_CAR } from './cars.queries';

@Injectable()
export class CarsService {
  constructor(@Inject('POSTGRES_CLIENT') private client: Client) {}

  async insert(newCar: Car) {
    return await this.client.query(await INSERT_CAR(newCar.carNumber));
  }
}
