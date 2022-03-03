import { Module } from '@nestjs/common';
import { RentSessionsService } from './rent-sessions.service';

@Module({
  providers: [RentSessionsService],
})
export class RentSessionsModule {}
