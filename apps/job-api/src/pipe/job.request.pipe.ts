import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import {
  CreateJobRequest,
  JobRequestPayload,
} from '@job-api/model/job/request/job.request';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { JobRequestPayloadFactory } from '@job-api/factory/job.request.payload.factory';
@Injectable()
export class RequestJobValidationPipe implements PipeTransform<any> {
  constructor(
    private readonly jobRequestPayloadFactory: JobRequestPayloadFactory,
  ) {}
  // createJobRequest
  async transform(
    value: CreateJobRequest<JobRequestPayload>,
  ): Promise<CreateJobRequest<JobRequestPayload>> {
    this.validateRequest(value);

    const payloadInstance = this.createPayloadInstance(value);
    await this.validatePayloadInstance(payloadInstance);
    return value;
  }

  private validateRequest(value: CreateJobRequest<JobRequestPayload>): void {
    if (!value || !value.jobType || !value.jobRequestPayload) {
      throw new BadRequestException('Invalid job request format');
    }
  }

  private createPayloadInstance<T extends JobRequestPayload>(
    value: CreateJobRequest<T>,
  ): T {
    const payloadType = this.jobRequestPayloadFactory.getPayloadType(
      value.jobType,
    );
    return plainToClass(payloadType, value.jobRequestPayload) as T;
  }

  private async validatePayloadInstance<T extends JobRequestPayload>(
    payloadInstance: T,
  ): Promise<void> {
    const errors: ValidationError[] = await validate(payloadInstance);
    if (errors.length > 0) {
      const formattedErrors = this.formatErrors(errors);
      throw new BadRequestException(formattedErrors);
    }
  }

  private formatErrors(errors: any[]): string {
    return errors
      .map((error) => {
        const constraints = Object.values(error.constraints || {}).join(', ');
        return `Property ${error.property} failed: ${constraints}`;
      })
      .join('\n');
  }
}
