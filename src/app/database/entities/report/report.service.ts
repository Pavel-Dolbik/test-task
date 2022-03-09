import { Injectable } from '@nestjs/common';
import { QueryResult } from 'pg';
import {
  dateDifference,
  daysInMonthOfDate,
  percentOfDays,
} from 'src/app/helpers/helpers';
import { DatabaseService } from '../../database.service';
import {
  SELECT_ALL_RENT_SESSIONS,
  SELECT_SESSION_BY_CAR_NUMBER,
} from '../rent-sessions/rent-sessions.queries';

@Injectable()
export class ReportService {
  constructor(private readonly databaseService: DatabaseService) {}

  async selectByCar(carNumber: string) {
    const queryResult = await this.getClient().query(
      SELECT_SESSION_BY_CAR_NUMBER(carNumber),
    );
    return this.showReport(queryResult);
  }

  async selectAll() {
    const queryResult = await this.getClient().query(SELECT_ALL_RENT_SESSIONS);
    return this.showReport(queryResult);
  }

  private showReport(queryResult: QueryResult<any>) {
    const result = [];
    for (const row of queryResult.rows) {
      const intermediateSecondDate: Date = row.endDate;
      const intermediateFirstDate: Date = row.startDate;
      while (intermediateSecondDate > intermediateFirstDate) {
        let diffInDays = 0;
        if (intermediateSecondDate.getDate() === 1) {
          diffInDays += intermediateSecondDate.getDate();
          intermediateSecondDate.setDate(intermediateSecondDate.getDate() - 1);
        } else {
          if (
            intermediateSecondDate.getMonth() !==
            intermediateFirstDate.getMonth()
          ) {
            diffInDays += intermediateSecondDate.getDate();
          } else {
            diffInDays += dateDifference(
              intermediateFirstDate,
              intermediateSecondDate,
            );
          }
          intermediateSecondDate.setDate(0);
        }

        const daysInMonth = daysInMonthOfDate(
          intermediateSecondDate.getFullYear(),
          intermediateSecondDate.getMonth() + 1,
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
