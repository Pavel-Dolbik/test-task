import { Module } from '@nestjs/common';
import { RentService } from './rent-session.service';

@Module({
  providers: [RentService],
})
export class RentModule {}
