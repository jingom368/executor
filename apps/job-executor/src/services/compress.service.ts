import { Injectable } from '@nestjs/common';

@Injectable()
export class CompressService {
  async compressFiles(data: any): Promise<void> {
    console.log('compressFiles', data);
    // 압축 로직 구현
  }

  async handleZip(zip: boolean, data: any): Promise<void> {
    if (zip) {
      await this.compressFiles(data);
    }
  }
}
