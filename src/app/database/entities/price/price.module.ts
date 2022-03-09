import { Module } from '@nestjs/common';
import { RentSessionsModule } from '../rent-sessions/rent-sessions.module';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { RentSessionsService } from '../rent-sessions/rent-sessions.service';
import { DatabaseModule } from '../../database.module';
import { RatesModule } from '../rates/rates.module';
import { RatesService } from '../rates/rates.service';

@Module({
  imports: [RentSessionsModule, DatabaseModule, RatesModule],
  providers: [PriceService, RentSessionsService, RatesService],
  controllers: [PriceController],
})
export class PriceModule {}
