import 'reflect-metadata';

const processorMetaKey = Symbol('JobProcessorName');

export function JobRegister(name: string): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(processorMetaKey, name, target);
  };
}

export function getJobRegisterName(target: any): string | undefined {
  // const name = Reflect.getMetadata(processorMetaKey, target);
  // console.log('getJobRegisterName:', target.name, '->', name);
  return Reflect.getMetadata(processorMetaKey, target);
}
