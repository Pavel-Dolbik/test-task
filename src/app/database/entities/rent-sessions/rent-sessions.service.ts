import { BadRequestException, Injectable } from '@nestjs/common';
import { HOLIDAYS } from '../../constants';
import { DatabaseService } from '../../database.service';
import { MESSAGE } from './constants';
import { CreateRentSessionDto } from './rent-sessions.dto';
import { INSERT_RENT_SESSION } from './rent-sessions.queries';

@Injectable()
export class RentSessionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async insert(newRentSession: CreateRentSessionDto) {
    await this.checkStartAndEndDates([
      new Date(newRentSession.startDate),
      new Date(newRentSession.endDate),
    ]);
    return await this.databaseService
      .getClient()
      .query(INSERT_RENT_SESSION(newRentSession));
  }

  async checkStartAndEndDates(dates: [Date, Date]) {
    for (const date of dates) {
      if (HOLIDAYS[date.getDay()] !== undefined) {
        throw new BadRequestException(MESSAGE.ERROR.INCORRECT_DATE);
      }
    }
  }
}
