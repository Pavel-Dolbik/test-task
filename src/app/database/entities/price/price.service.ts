import { Injectable } from '@nestjs/common';
import { dateDifference } from 'src/app/helpers/helpers';
import { RatesService } from '../rates/rates.service';
import { RentSession } from '../rent-sessions/rent-session.entity';
import { RentSessionsService } from '../rent-sessions/rent-sessions.service';
import { BASIC_PRICE } from './constants';

@Injectable()
export class PriceService {
  constructor(
    private readonly rentSessionsService: RentSessionsService,
    private readonly ratesService: RatesService,
  ) {}

  async computePriceForSessionPeriod(rentSessionId: string) {
    const session: RentSession = (
      await this.rentSessionsService.selectById(rentSessionId)
    ).rows[0];
    const { startDate, endDate } = session;

    const diff = dateDifference(startDate, endDate);
    const rates = (await this.ratesService.selectAll()).rows;
    let price = 0;
    if (diff <= 4) {
      price += BASIC_PRICE * diff;
    } else {
      price += BASIC_PRICE * 4;
      let percent =
        BASIC_PRICE * rates.find((rate) => rate.percent === 5).percent * 0.01;
      if (diff <= 9) {
        price += (BASIC_PRICE - percent) * (diff - 4);
      } else {
        const delta = (BASIC_PRICE - percent) * (9 - 4);
        price += delta;
        percent =
          BASIC_PRICE *
          rates.find((rate) => rate.percent === 10).percent *
          0.01;
        if (diff <= 17) {
          price += (BASIC_PRICE - percent) * (diff - 9);
        } else {
          price += (BASIC_PRICE - percent) * (17 - 9);
          percent =
            BASIC_PRICE *
            rates.find((rate) => rate.percent === 15).percent *
            0.01;
          if (diff <= 29) {
            price += (BASIC_PRICE - percent) * (diff - 17);
          } else {
            price += (BASIC_PRICE - percent) * (29 - 17);
          }
        }
      }
    }

    return price;
  }
}
