import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
`else {
  let interMediateMonth = endMonth;
  const secondDate: Date = row.endDate;
  const daysInMonth = daysInMonthOfDate(
    secondDate.getFullYear(),
    secondDate.getMonth() + 1,
  );
  let firstDate = new Date(
    \`\${secondDate.getFullYear()}-\${(
      '0' +
      (Number(secondDate.getMonth()) + 1)
    ).slice(-2)}-01\`,
  );
  while (interMediateMonth >= startMonth) {
    let diffInDays;
    if (interMediateMonth != startMonth) {
      diffInDays += 1;
    }
    if (secondDate.getDate() === 1) {
      diffInDays = 1;
      await secondDate.setDate(secondDate.getDate() - 1);
      firstDate = new Date(
        \`\${secondDate.getFullYear()}-\${(
          '0' +
          (Number(secondDate.getMonth()) + 1)
        ).slice(-2)}-01\`,
      );
      console.log('Промежуток', secondDate, firstDate);
      interMediateMonth--;
    }
    diffInDays = dateDifference(firstDate, secondDate);
    const percentOfDays = ((diffInDays * 100) / daysInMonth).toFixed(2);
    result.push({
      carNumber: row.carNumber,
      month: secondDate.toLocaleString('default', {
        month: 'long',
      }),
      diffInDays,
    });

    interMediateMonth--;
    secondDate.setDate(firstDate.getDate() - 1);
    if (diffInMonths === 1) {
      firstDate = row.startDate;
    }
  }
}`;
