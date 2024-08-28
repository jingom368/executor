import { Module } from '@nestjs/common';
import { FileUtil } from './file.util';

@Module({
  imports: [],
  controllers: [],
  providers: [FileUtil],
  exports: [FileUtil],
})
export class UtilModule {}
