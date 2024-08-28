import { Injectable } from '@nestjs/common';

@Injectable()
export class MergeService {
  async combineImages(data: any): Promise<void> {
    console.log('combineImages', data);
    // 이미지 합치기 로직 구현
  }

  async handleImgCombine(imgCombine: boolean, data: any): Promise<void> {
    if (imgCombine) {
      await this.combineImages(data);
    }
  }
}
