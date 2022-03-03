import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { DatabaseModule } from '../../database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CarsService],
  controllers: [CarsController],
})
export class CarsModule {}
