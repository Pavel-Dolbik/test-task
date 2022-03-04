import { Injectable } from '@nestjs/common';
import { RentSessionsService } from '../rent-sessions/rent-sessions.service';

@Injectable()
export class PriceService {
  constructor(private readonly rentSessionsService: RentSessionsService) {}

  async computePriceForSessionPeriod(rentSessionId: string) {
    const session = await this.rentSessionsService.selectById(rentSessionId);
    return session;
  }
}
