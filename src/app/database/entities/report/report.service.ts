import { Injectable } from '@nestjs/common';
import {
  dateDifference,
  daysInMonthOfDate,
  percentOfDays,
} from 'src/app/helpers/helpers';
import { DatabaseService } from '../../database.service';
import { SELECT_ALL_RENT_SESSIONS } from '../rent-sessions/rent-sessions.queries';

@Injectable()
export class ReportService {
  constructor(private readonly databaseService: DatabaseService) {}

  async selectAll() {
    const queryResult = await this.getClient().query(SELECT_ALL_RENT_SESSIONS);

    const result = [];
    for (const row of queryResult.rows) {
      const secondDate = row.endDate;
      const firstDate = row.startDate;
      while (secondDate > firstDate) {
        let diffInDays = 0;
        if (secondDate.getDate() === 1) {
          diffInDays += secondDate.getDate();
          secondDate.setDate(secondDate.getDate() - 1);
        } else {
          if (secondDate.getMonth() !== firstDate.getMonth()) {
            diffInDays += secondDate.getDate();
          } else {
            diffInDays += dateDifference(firstDate, secondDate);
          }
          secondDate.setDate(0);
        }

        const daysInMonth = daysInMonthOfDate(
          secondDate.getFullYear(),
          secondDate.getMonth() + 1,
        );
        const percent = percentOfDays(diffInDays, daysInMonth);

        result.push({
          carNumber: row.carNumber,
          month: row.endDate.toLocaleString('default', { month: 'long' }),
          percent,
        });
      }
      console.log();
    }
    return result;
  }

  getClient() {
    return this.databaseService.getClient();
  }
}
