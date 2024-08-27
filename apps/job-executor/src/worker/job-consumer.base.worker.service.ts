import { JobProducerRepository } from '@job-producer/job-producer.repository';
import { JobStatus } from '@job-producer/job-type/entity/job.status';
import { OnModuleInit } from '@nestjs/common';
import {
  QueuePro,
  WorkerPro,
  ConnectionOptions,
  JobPro,
} from '@taskforcesh/bullmq-pro';

export abstract class BaseWorkerService implements OnModuleInit {
  protected worker: WorkerPro;
  protected queuePro: QueuePro;

  constructor(
    protected readonly jobProducerRepository: JobProducerRepository,
  ) {}

  async onModuleInit() {
    // QueuePro 인스턴스 생성
    this.queuePro = this.createQueuePro(this.getQueueName());

    // 글로벌 동시성 설정
    await this.setGlobalConcurrency(this.queuePro, this.getConcurrency());

    // 레디스 연결 옵션 설정
    const connectionOptions = this.getConnectionOptions();

    // WorkerPro 인스턴스 생성
    this.createWorker(this.getProcessor(), connectionOptions);

    // 이벤트 설정
    this.setupWorkerEvents();
  }

  protected abstract getQueueName(): string;
  protected abstract getConcurrency(): number;
  protected abstract getProcessor(): string | ((job: JobPro) => Promise<void>);

  private createQueuePro(queueName: string): QueuePro {
    return new QueuePro(queueName);
  }

  private async setGlobalConcurrency(
    queuePro: QueuePro,
    concurrency: number,
  ): Promise<void> {
    await queuePro.setGlobalConcurrency(concurrency);
  }

  private getConnectionOptions(): ConnectionOptions {
    return {
      host: 'localhost',
      port: 6379,
    };
  }

  private createWorker(
    processorFile: string | ((job: JobPro) => Promise<void>),
    connectionOptions: ConnectionOptions,
  ): void {
    this.worker = new WorkerPro(this.getQueueName(), processorFile, {
      connection: connectionOptions,
      concurrency: this.getConcurrency(),
      useWorkerThreads: false,
      ttl: 5000,
    });
  }

  private setupWorkerEvents(): void {
    this.worker.on('completed', async (job, returnValue) => {
      const parentId = job.opts.parent.id;
      const childJobId = job.opts.jobId;
      this.jobProducerRepository.updateChildJobStatus(
        parentId,
        childJobId,
        JobStatus.COMPLETED,
      );
      console.log('returnValue', returnValue);
      console.log(`Job ${job.id} completed!`);
    });

    this.worker.on('failed', async (job, err) => {
      console.error(`Job ${job.id} failed with error ${err.message}`);
    });

    this.worker.on('active', (job) => {
      const parentId = job.opts.parent.id;
      const childJobId = job.opts.jobId;
      this.jobProducerRepository.updateChildJobStatus(
        parentId,
        childJobId,
        JobStatus.IN_PROGRESS,
      );
      console.log(`Job ${job.id} is now active!`);
    });
  }
}
