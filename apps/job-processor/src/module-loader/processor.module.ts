import { DynamicModule, Module } from '@nestjs/common';
import { loadProcessorsFromDir } from './module-loader';
import { join } from 'path';
import { ImageRenderingJobOutput } from '@job-processor/job-processor/job-output';

@Module({})
export class ProcessorModule {
  static async forRootAsync(): Promise<DynamicModule> {
    const providers = await loadProcessorsFromDir(
      join(__dirname, '..', 'job-processor'),
    );
    // console.log('providers', providers);
    return {
      module: ProcessorModule,
      imports: [],
      providers: [...providers, ImageRenderingJobOutput],
      exports: [...providers, ImageRenderingJobOutput],
    };
  }
}
