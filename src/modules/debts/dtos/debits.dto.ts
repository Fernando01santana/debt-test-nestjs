import { IsNumber, IsString } from 'class-validator';

export class CreateDebitRequesDto {
  @IsString()
  data_expire: string;

  @IsString()
  document: string;

  @IsNumber()
  value: number;
}

export class FindDebitByDocumentDto {
  @IsString()
  document: string;
}
