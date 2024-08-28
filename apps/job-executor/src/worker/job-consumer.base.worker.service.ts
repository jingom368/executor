import { S3Service } from '@job-executor/s3/s3.service';
import { FileUtil } from '@job-executor/util/file.util';
import { JobProducerRepository } from '@job-producer/job-producer.repository';
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
    protected readonly s3Service: S3Service,
    protected readonly fileUtil: FileUtil,
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
    this.worker.on('completed', async (job: JobPro, returnValue) => {
      console.log(`Job ${job.id} completed!`);
      await this.onJobCompleted(job, returnValue);
    });

    this.worker.on('failed', async (job: JobPro, err) => {
      await this.onJobFailed(job, err);
    });

    this.worker.on('active', (job: JobPro) => {
      console.log(`Job ${job.id} is now active!`);
      this.onJobActive(job);
    });
  }

  protected abstract onJobCompleted(
    job: JobPro,
    returnValue: any,
  ): Promise<void>;
  protected abstract onJobFailed(job: JobPro, err: Error): Promise<void>;
  protected abstract onJobActive(job: JobPro): void;
}
