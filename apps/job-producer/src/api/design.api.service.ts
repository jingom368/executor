import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DesignApiService {
  constructor(private readonly httpService: HttpService) {}

  async fetchJobData(): Promise<any> {
    // const response = await this.httpService.get('').toPromise();
    // return response.data;
    return {};
  }
}
