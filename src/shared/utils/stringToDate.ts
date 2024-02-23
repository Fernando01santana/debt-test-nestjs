import { UserDateFormatsException } from '../exceptions/date.exception';

export class StringToDate {
  convertDate(data: string): Date {
    try {
      if (!/\d{2}\/\d{2}\/\d{4}/.test(data)) {
        throw new UserDateFormatsException();
      }
      const dateSplit = data.split('/');
      const dataFormtada =
        dateSplit[1] + '-' + dateSplit[0] + '-' + dateSplit[2];
      const stringDateToDate = new Date(dataFormtada);
      return stringDateToDate;
    } catch (error) {
      throw new UserDateFormatsException();
    }
  }
}
