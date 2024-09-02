import { DynamicModule, Module } from '@nestjs/common';
import { loadProcessorsFromDir } from './module-loader';
import { join } from 'path';
import {
  ImageRenderingJobOutput,
  PdfRenderingJobOutput,
} from '@job-processor/job-processor/job-output';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class ProcessorModule {
  static async forRootAsync(): Promise<DynamicModule> {
    const providers = await loadProcessorsFromDir(
      join(__dirname, '..', 'job-processor'),
    );
    // console.log('providers', providers);
    return {
      module: ProcessorModule,
      imports: [ConfigModule.forRoot()],
      providers: [...providers, ImageRenderingJobOutput, PdfRenderingJobOutput],
      exports: [...providers],
    };
  }
}
