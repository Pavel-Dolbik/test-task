import { BadRequestException, Injectable } from '@nestjs/common';
import { HOLIDAYS } from './constants';
import { DatabaseService } from '../../database.service';
import { MESSAGE } from './constants';
import { CreateRentSessionDto } from './rent-sessions.dto';
import {
  INSERT_RENT_SESSION,
  SELECT_ALL_RENT_SESSIONS,
  SELECT_RENT_SESSION_BY_ID,
} from './rent-sessions.queries';

@Injectable()
export class RentSessionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async insert(newRentSession: CreateRentSessionDto) {
    this.checkStartAndEndDates([
      new Date(newRentSession.startDate),
      new Date(newRentSession.endDate),
    ]);
    return await this.getClient().query(INSERT_RENT_SESSION(newRentSession));
  }

  async selectById(id: string) {
    return await this.getClient().query(SELECT_RENT_SESSION_BY_ID(id));
  }

  async selectAll() {
    return await this.getClient().query(SELECT_ALL_RENT_SESSIONS());
  }

  private getClient() {
    return this.databaseService.getClient();
  }

  private checkStartAndEndDates(dates: [Date, Date]) {
    for (const date of dates) {
      if (HOLIDAYS[date.getDay()] !== undefined) {
        throw new BadRequestException(MESSAGE.ERROR.INCORRECT_DATE);
      }
    }
  }
}
