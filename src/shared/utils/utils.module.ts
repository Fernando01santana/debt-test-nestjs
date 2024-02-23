// utils/utils.module.ts
import { Module } from '@nestjs/common';

import { TimeAdder } from './addTimeToTIme';
import { EncriptPassword } from './encriptPassword';
import { ItemExistsInEnum } from './searchEnum';
import { StringToDate } from './stringToDate';

@Module({
  providers: [StringToDate, EncriptPassword, ItemExistsInEnum, TimeAdder],
  exports: [StringToDate, EncriptPassword, ItemExistsInEnum, TimeAdder],
})
export class UtilsModule {}
