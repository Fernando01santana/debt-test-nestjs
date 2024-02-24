import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDebitRequesDto {
  @IsString()
  @ApiProperty({
    example: '5/03/2024',
    description: 'Data de vencimento da divida.',
  })
  data_expire: string;

  @IsString()
  @ApiProperty({
    example: '00000000000',
    description: 'Documento de identificacao do usuario.',
  })
  document: string;

  @IsNumber()
  @ApiProperty({
    example: '1500',
    description: 'Valor da divida.',
  })
  value: number;
}

export class FindDebitByDocumentDto {
  @IsString()
  document: string;
}
