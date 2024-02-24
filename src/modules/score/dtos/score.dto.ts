import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ScoreResponseDto {
  @IsNumber()
  @ApiProperty({
    example: '800',
    description: 'Score que o cliente naquele momento.',
  })
  score: number;

  @IsString()
  @ApiProperty({
    example: '15/12/2001',
    description: 'Data em que o score foi consultado.',
  })
  date: Date;
}
