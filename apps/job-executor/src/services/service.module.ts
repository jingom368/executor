import { Module } from '@nestjs/common';
import { MergeService } from './merge.service';
import { CompressService } from './compress.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MergeService, CompressService],
  exports: [MergeService, CompressService],
})
export class ServiceModule {}
