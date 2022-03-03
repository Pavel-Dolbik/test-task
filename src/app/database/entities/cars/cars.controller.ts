import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Car } from './car.entity';
import { CarsService } from './cars.service';

@Controller('cars')
@ApiTags('Cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Post()
  @ApiBody({ type: Car })
  async insert(@Body() newCar: Car) {
    return await this.carsService.insert(newCar);
  }
}
