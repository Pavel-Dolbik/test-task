import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database.service';
import { Car } from './car.entity';
import { COUNT, INSERT_CAR } from './cars.queries';
import { MESSAGE } from './constants';

@Injectable()
export class CarsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async insert(newCar: Car) {
    const count: number = await (
      await this.getClient().query(COUNT)
    ).rows[0].count;
    if (count >= 5) {
      throw new BadRequestException(MESSAGE.ERROR.THE_CAR_PARK_IS_FULL);
    }

    return await this.getClient().query(INSERT_CAR(newCar));
  }

  private getClient() {
    return this.databaseService.getClient();
  }
}
