// 되는 코드 - nestJS
import { Module } from '@nestjs/common';
import { JobProcessorService } from './job-processor.service';
// import { ImageRenderingJobOutput } from './job-processor/job-output';
// import { ImageRenderingJobProcessor } from './job-processor/image-rendering/image-rendering-job.processor';
import { ProcessorModule } from './module-loader/processor.module';
import { processorFactoryProvider } from './module-loader/processor-factory.provider';

@Module({
  imports: [ProcessorModule.forRootAsync()],
  controllers: [],
  providers: [JobProcessorService, processorFactoryProvider],
  exports: [],
})
export class JobProcessorModule {}

// TO-DO
// 어떻게 볼 수 있냐
// 어떻게 수정할 수 있냐.
// 정상화 할 수 있는 옵션을 찾기
// 다른 번들러를 쓸 지를 찾아보는 부분.
// nestJS에서 구현해야 하는 건지 제공하는 지.
