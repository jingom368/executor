import { getJobRegisterName } from '@job-processor/job-processor/job-processor.decorator';
import { JobProcessor } from '@job-processor/job-processor/job.processor';
import { Provider } from '@nestjs/common';
import { glob } from 'glob';

export async function loadProcessorsFromDir(
  directory: string,
): Promise<Provider[]> {
  const classes: Provider[] = [];
  const files = await glob(`${directory}/**/*.processor.js`);
  //   console.log('found files:', files);

  for (const file of files) {
    const module = await import(file);
    Object.keys(module).forEach((key) => {
      const exported = module[key];
      //   console.log('exported', exported);
      //   console.log('module', module);
      if (
        typeof exported === 'function' &&
        exported?.prototype instanceof JobProcessor
      ) {
        const jobKey = getJobRegisterName(exported);
        // console.log('jobKey', jobKey);
        classes.push({
          provide: `${jobKey}JobProcessor`, // ImageProcessor, VideoProcessor
          useClass: exported,
        });
      }
    });
  }
  return classes;
}
