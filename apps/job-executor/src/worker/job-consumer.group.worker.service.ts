import { JobProducerRepository } from '@job-producer/job-producer.repository';
import { JobStatus } from '@job-producer/job-type/entity/job.status';
import { Module, OnModuleInit } from '@nestjs/common';
import {
  QueuePro,
  WorkerPro,
  ConnectionOptions,
} from '@taskforcesh/bullmq-pro';
import { join, resolve } from 'path';

@Module({})
export class JobGroupWorkerService implements OnModuleInit {
  constructor(private readonly jobProducerRepository: JobProducerRepository) {}

  private worker: WorkerPro;
  private queuePro: QueuePro;

  async onModuleInit() {
    // QueuePro 인스턴스 생성
    this.createQueuePro();

    // 글로벌 동시성 설정
    await this.setGlobalConcurrency();

    // 레디스 연결 옵션 설정
    const connectionOptions = this.getConnectionOptions();

    // 프로세스 파일 불러오기
    const processorFile = this.getProcessorFilePath();

    // WorkerPro 인스턴스 생성
    this.createWorker(processorFile, connectionOptions);

    // 이벤트 설정
    this.setupWorkerEvents();
  }

  private createQueuePro(): void {
    this.queuePro = new QueuePro('jobQueue');
  }

  private async setGlobalConcurrency(): Promise<void> {
    await this.queuePro.setGlobalConcurrency(5);
  }

  private getConnectionOptions(): ConnectionOptions {
    return {
      host: 'localhost',
      port: 6379,
    };
  }

  private getProcessorFilePath(): string {
    const baseDir = resolve(__dirname, '../job-processor');
    const processorFilePath = join(baseDir, 'group-main.js');
    // console.log('processorFilePath', processorFilePath);
    return processorFilePath;
  }

  private createWorker(
    processorFile: string,
    connectionOptions: ConnectionOptions,
  ): void {
    this.worker = new WorkerPro('GROUP_IMAGE_RENDERING', processorFile, {
      connection: connectionOptions,
      concurrency: 5,
      useWorkerThreads: false,
      ttl: 5000,
    });
  }

  private setupWorkerEvents(): void {
    this.worker.on('completed', async (job) => {
      const parentId = job.opts.parent.id;
      const childJobId = job.opts.jobId;
      this.jobProducerRepository.updateChildJobStatus(
        parentId,
        childJobId,
        JobStatus.COMPLETED,
      );
      console.log(`Group job ${job.id} completed!`);
    });

    this.worker.on('failed', async (job, err) => {
      console.error(`Group job ${job.id} failed with error ${err.message}`);
    });

    this.worker.on('active', (job) => {
      const parentId = job.opts.parent.id;
      const childJobId = job.opts.jobId;
      this.jobProducerRepository.updateChildJobStatus(
        parentId,
        childJobId,
        JobStatus.IN_PROGRESS,
      );
      console.log(`Group job ${job.id} is now active!`);
    });
  }
}
