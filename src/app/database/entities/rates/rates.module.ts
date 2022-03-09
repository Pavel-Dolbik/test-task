import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { RatesService } from './rates.service';

@Module({
  imports: [DatabaseModule],
  providers: [RatesService],
})
export class RatesModule {}
