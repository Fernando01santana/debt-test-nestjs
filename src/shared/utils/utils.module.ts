// utils/utils.module.ts
import { Module } from '@nestjs/common';

import { EncriptPassword } from './encriptPassword';
import { ItemExistsInEnum } from './searchEnum';
import { StringToDate } from './stringToDate';

@Module({
  providers: [StringToDate, EncriptPassword, ItemExistsInEnum],
  exports: [StringToDate, EncriptPassword, ItemExistsInEnum],
})
export class UtilsModule {}
