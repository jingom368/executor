import { Module } from '@nestjs/common';
import { JobProducerRepository } from 'apps/job-api/src/job-producer.repository';
import { S3Service } from '@job-executor/s3/s3.service';
import { FileUtil } from '@job-executor/util/file.util';
import { ChildJobFactory } from '@job-executor/factory/job.child.factory';
import { ChildWorkerService } from './job-consumer.child.worker.service';

@Module({})
export class ImageRenderingChildWorkerService extends ChildWorkerService {
  constructor(
    jobProducerRepository: JobProducerRepository,
    childJobFactory: ChildJobFactory,
    s3Service: S3Service,
    fileUtil: FileUtil,
  ) {
    super(jobProducerRepository, childJobFactory, s3Service, fileUtil);
  }

  protected getQueueName(): string {
    return 'IMAGE_RENDERING';
  }

  protected getConcurrency(): number {
    return 2;
  }
}

// returnValue
// returnValue 타입 변환
// factory 이용해서 jobType에 따라 변환
// factory jobOut을 변환해주는 팩토리
// changeUploadUrl
// jobOutPut 클래스 설계 returnType returnValue 타입 변환만이 아니라 마무리 작업 해주는 클래스
// 추상적으로 처리해주어야 함. 잡 타입만 던져주면 하는 마무리 클래스의 역할 -> DB, S3 핵심 데이터만 다르게
// 템플릿 메서드 패턴.

// 잡을 완료 -> complete
// 팩토리 + 템플릿 메서드 패턴 + group / 통일 해야 되는건가..? 아니면
// 받은 Job 데이터로 판단할 수 있는가? 식별할 수 있는 지. -> 할 수 없음, 구분 해야 함.
// 누구한테 의존해서 처리를 맡겨야 하는가 // 자식 : 최소 s3 업로드, 로컬 파일 path로 파일 업로드 / 유효성 체크 응답 값이 있는지? 파일이 실존 하는 지
// 그룹 잡은 조건부 업로드, 흐름이 다르다. s3 어떻게 업로드 할 것인지 설계 해야 함.
// 업로드 파일 path에 바로 업로드 할 것인지 / 임시로 할 것인지.
// 모바일은 각 FileUrl이 필요하고 모바일이 아닌 곳에서는 압축 파일 제공
// 그룹 : 순회하면서 다운 받고 압축하고 업로드 하고
// zip() -> imgCombine() -> upload()
// 인터페이스 추상클래스 함수를 정의 해야 한다. 무조건 이걸 해야해. 공통된 구현체가 필요하다. abstract / interface -> 무조건 구현 해라!
// before process after / pre do post / finish / 완료 실패 / 완료 전용 팩토리

// 팩토리 -> nest 구현할 수 있는 factory / mapper 쓰는 것처럼 register 해줘서 액션 실행할 함수 하면 주입 받아서 jobType만 넘기면 함수를 실행.
//
