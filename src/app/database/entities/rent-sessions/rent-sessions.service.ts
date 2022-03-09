import { BadRequestException, Injectable } from '@nestjs/common';
import { HOLIDAYS } from './constants';
import { DatabaseService } from '../../database.service';
import { MESSAGE } from './constants';
import { CreateRentSessionDto } from './rent-sessions.dto';
import {
  INSERT_RENT_SESSION,
  SELECT_ALL_RENT_SESSIONS,
  SELECT_LAST_SESSION,
  SELECT_RENT_SESSION_BY_ID,
} from './rent-sessions.queries';
import { dateDifference } from 'src/app/helpers/helpers';

@Injectable()
export class RentSessionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async insert(newRentSession: CreateRentSessionDto) {
    this.checkStartAndEndDates([
      new Date(newRentSession.startDate),
      new Date(newRentSession.endDate),
    ]);
    await this.checkLastSession(
      new Date(newRentSession.startDate),
      newRentSession.carNumber,
    );
    return await this.getClient().query(INSERT_RENT_SESSION(newRentSession));
  }

  async selectById(id: string) {
    return await this.getClient().query(SELECT_RENT_SESSION_BY_ID(id));
  }

  async selectAll() {
    return await this.getClient().query(SELECT_ALL_RENT_SESSIONS);
  }

  private checkStartAndEndDates(dates: [Date, Date]) {
    for (const date of dates) {
      if (HOLIDAYS[date.getDay()] !== undefined) {
        throw new BadRequestException(MESSAGE.ERROR.INCORRECT_DATE);
      }
    }
  }

  private async checkLastSession(startDate: Date, carNumber: string) {
    const queryResult = await this.getClient().query(
      SELECT_LAST_SESSION(carNumber),
    );
    if (queryResult.rows.length > 0 && queryResult.rows[0].endDate) {
      const endDateOfLastSession = queryResult.rows[0].endDate;
      if (
        endDateOfLastSession &&
        dateDifference(startDate, endDateOfLastSession) < 3
      ) {
        throw new BadRequestException(
          MESSAGE.ERROR.YOU_HAVE_ALREADY_BOOKED_PARKING,
        );
      }
    }
  }

  private getClient() {
    return this.databaseService.getClient();
  }
}
