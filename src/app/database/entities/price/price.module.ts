import { forwardRef, Module } from '@nestjs/common';
import { RentSessionsModule } from '../rent-sessions/rent-sessions.module';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';

@Module({
  imports: [RentSessionsModule],
  providers: [PriceService],
  controllers: [PriceController],
})
export class PriceModule {}
