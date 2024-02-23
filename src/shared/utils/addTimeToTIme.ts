import { ConfigService } from '@nestjs/config';

export class TimeAdder {
  private currentTime: Date;

  constructor() {
    this.currentTime = new Date();
  }
  addTimeToCurrentDate(): string {
    try {
      const configService = new ConfigService();

      const matchResult = configService
        .get<string>('EXPIRE_TOKEN')
        .match(/^(\d+)([hmsd])$/);

      if (!matchResult) {
        throw new Error('Formato de tempo inválido.');
      }

      const value = parseInt(matchResult[1], 10);
      const unit = matchResult[2] as 'h' | 'm' | 's' | 'd';

      const timeToAdd = this.calculateTimeToAdd(value, unit);
      const newTime = new Date(this.currentTime.getTime() + timeToAdd);

      return this.formatDateTime(newTime);
    } catch (error) {
      throw new Error('Erro ao adicionar tempo: ' + error.message);
    }
  }

  private calculateTimeToAdd(
    value: number,
    unit: 'h' | 'm' | 's' | 'd',
  ): number {
    switch (unit) {
      case 'h':
        return value * 60 * 60 * 1000;
      case 'm':
        return value * 60 * 1000;
      case 's':
        return value * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        throw new Error('Unidade de tempo desconhecida.');
    }
  }

  private formatDateTime(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().padStart(4, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
