import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PriceService } from './price.service';

@Controller('price')
@ApiTags('Price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  async computePriceForSessionPeriod(id: string) {
    return await this.computePriceForSessionPeriod(id);
  }
}
