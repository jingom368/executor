import { Module } from '@nestjs/common';
import { S3Util } from './s3.util';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from '@job-executor/util/util.module';

@Module({
  imports: [ConfigModule.forRoot(), UtilModule],
  controllers: [],
  providers: [S3Util, S3Service],
  exports: [S3Service],
})
export class S3Module {}
