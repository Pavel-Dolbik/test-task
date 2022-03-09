export const MESSAGE = {
  ERROR: {
    INCORRECT_DATE:
      'The start and the end date of the rental cannot fall on a weekend!',
    YOU_HAVE_ALREADY_BOOKED_PARKING: `Error: Cannot create rent session!`,
  },
};

export enum HOLIDAYS {
  SATURDAY = 6,
  SUNDAY = 0,
}

export const ONE_DAY = 24 * 60 * 60 * 1000;
