import { join } from 'path';
import { glob } from 'glob';
import { JobProcessor } from './job-processor/job.processor';
import { getJobRegisterName } from './job-processor/job-processor.decorator';
import { JobOutput } from './job-processor/job-output';

const processorsDirectory = join(__dirname, './job-processor');

type JobProcessorConstructor = new <
  INPUT,
  OUTPUT extends JobOutput,
>() => JobProcessor<INPUT, OUTPUT>;

/**
 * 모든 JobProcessor 중에 지정한 이름과 일치하는 JobProcessor 인스턴스를 생성하여 반환
 * @param jobRegisterName JobType에 속하는 이름 중 하나를 설정
 */
export async function loadProcessor(
  jobRegisterName: string,
): Promise<JobProcessor<any, any>> {
  try {
    const files = await glob(`${processorsDirectory}/**/*.processor.js`);
    // console.log('Found files:', files);

    for (const file of files) {
      const module = await import(file);
      // console.log('Imported module:', module);
      const classes = Object.values(module);
      // const keys = Object.keys(module);
      // console.log('Classes:', classes);
      // console.log('Keys:', keys);

      for (const ProcessorClass of classes) {
        // console.log('ProcessorClass:', ProcessorClass);
        if (
          typeof ProcessorClass === 'function' &&
          ProcessorClass?.prototype instanceof JobProcessor
        ) {
          const registeredProcessorName = getJobRegisterName(ProcessorClass);
          // console.log(
          //   'Processor class:',
          //   ProcessorClass.name,
          //   'Registered name:',
          //   registeredProcessorName,
          // );
          if (registeredProcessorName === jobRegisterName) {
            return new (ProcessorClass as JobProcessorConstructor)();
          }
        }
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }

  throw new Error(`${jobRegisterName} Job Processor not found`);
}
