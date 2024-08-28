import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileUtil {
  private rootDir: string;
  private assetsDir: string;

  constructor() {
    // 프로젝트 루트 경로 계산
    this.rootDir = process.cwd();
    // assets 디렉토리 경로 생성
    this.assetsDir = path.join(this.rootDir, 'assets');
  }

  // 파일 URL을 설정하는 메서드
  public getFullPath(fileUrl: string): string {
    // 파일 경로 설정
    return path.join(this.assetsDir, fileUrl);
  }

  // 파일 스트림을 생성하는 메서드
  public createFileStream(filePath: string): fs.ReadStream {
    return fs.createReadStream(filePath);
  }
}
