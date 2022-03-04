import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { Car } from './car.entity';
import { INSERT_CAR } from './cars.queries';

@Injectable()
export class CarsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async insert(newCar: Car) {
    return await this.databaseService.getClient().query(INSERT_CAR(newCar));
  }
}
