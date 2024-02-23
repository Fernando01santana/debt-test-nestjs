import { IsNumber, IsString } from 'class-validator';

export class ScoreResponseDto {
  @IsNumber()
  score: number;

  @IsString()
  date: string;
}
