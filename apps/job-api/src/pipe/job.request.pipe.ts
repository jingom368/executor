import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { JobPayloadFactory } from '@job-api/mapper/request.payload.factory';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class JobTypeValidationPipe implements PipeTransform<any> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly jobPayloadFactory: JobPayloadFactory,
  ) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !value.jobType || !value.jobRequestPayload) {
      throw new BadRequestException('Invalid job request format');
    }

    const jobPayload = this.mapper.map(
      value.jobRequestPayload,
      value.jobRequestPayload,
      this.jobPayloadFactory.createJobRequestToPayload(value.jobType),
    );
    return value;
  }
}
