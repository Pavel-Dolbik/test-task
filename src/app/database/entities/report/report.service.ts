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
import * as excel from 'xlsx';
import { REPORT_SUCCESSFULLY_CREATED } from './constants';

@Injectable()
export class ReportService {
  constructor(private readonly databaseService: DatabaseService) {}

  async selectByCar(carNumber: string) {
    const queryResult = await this.getClient().query(
      SELECT_SESSION_BY_CAR_NUMBER(carNumber),
    );
    return await this.makeReport(queryResult, carNumber);
  }

  async selectAll() {
    const queryResult = await this.getClient().query(SELECT_ALL_RENT_SESSIONS);
    return await this.makeReport(queryResult);
  }

  private async makeReport(queryResult: QueryResult<any>, carNumber?: string) {
    const result = [];
    for (const row of queryResult.rows) {
      const intermediateSecondDate = row.endDate;
      const intermediateFirstDate = row.startDate;
      while (intermediateSecondDate > intermediateFirstDate) {
        const month = intermediateSecondDate.toLocaleString('default', {
          month: 'long',
        });
        let diffInDays = 0;
        if ((await intermediateSecondDate.getDate()) === 1) {
          diffInDays += await intermediateSecondDate.getDate();
          await intermediateSecondDate.setDate(
            intermediateSecondDate.getDate() - 1,
          );
        } else {
          if (
            (await intermediateSecondDate.getMonth()) !==
            (await intermediateFirstDate.getMonth())
          ) {
            diffInDays += await intermediateSecondDate.getDate();
          } else {
            diffInDays += dateDifference(
              intermediateFirstDate,
              intermediateSecondDate,
            );
          }
          await intermediateSecondDate.setDate(0);
        }

        const daysInMonth = daysInMonthOfDate(
          await intermediateSecondDate.getFullYear(),
          (await intermediateSecondDate.getMonth()) + 1,
        );
        const percent = percentOfDays(diffInDays, daysInMonth);

        result.push({
          sessionId: row.id,
          carNumber: row.carNumber,
          month,
          percent,
        });
      }
    }
    return await this.createExcelFile(result, carNumber);
  }

  private async createExcelFile(result: any[], carNumber?: string) {
    const wb = excel.utils.book_new();
    let fileName = 'D:\\\\Downloads\\Report_testtask.xls';
    if (carNumber) {
      fileName = `D:\\\\Downloads\\Report_testtask_${carNumber}.xls`;
    }

    const data = [result];

    data.forEach((array) => {
      const ws = excel.utils.json_to_sheet(array);
      excel.utils.book_append_sheet(wb, ws, 'Report');
    });

    excel.writeFile(wb, fileName);
    return REPORT_SUCCESSFULLY_CREATED;
  }

  private getClient() {
    return this.databaseService.getClient();
  }
}
