import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PriceService } from './price.service';

@Controller('price')
@ApiTags('Price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get(':id')
  async computePriceForSessionPeriod(@Param('id') rentSessionId: string) {
    return await this.priceService.computePriceForSessionPeriod(rentSessionId);
  }
}
