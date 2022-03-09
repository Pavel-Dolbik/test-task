import { ONE_DAY } from '../database/entities/rent-sessions/constants';

export const dateDifference = (first: Date, second: Date) => {
  return Math.round(Math.abs((second.getTime() - first.getTime()) / ONE_DAY));
};

export const daysInMonthOfDate = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const percentOfDays = (diffInDays: number, daysInMonth: number) => {
  return ((diffInDays * 100) / daysInMonth).toFixed(2);
};
