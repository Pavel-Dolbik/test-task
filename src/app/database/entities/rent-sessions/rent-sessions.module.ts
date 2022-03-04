import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { RentSessionsService } from './rent-sessions.service';
import { RentSessionsController } from './rent-sessions.controller';

@Module({
  imports: [DatabaseModule],
  providers: [RentSessionsService],
  controllers: [RentSessionsController],
})
export class RentSessionsModule {}
