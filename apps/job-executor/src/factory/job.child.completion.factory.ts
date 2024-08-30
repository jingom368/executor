export class JobCompletionFactory {
  getJobCompletionHandler(jobType: string): new () => JobCompletionHandler {
    switch (jobType) {
      case 'IMAGE_RENDERING':
        return new ImageRenderingChildJobCompletionHandler();
      case 'PDF_RENDERING':
        return new PdfRenderingChildJobCompletionHandler();
      default:
        throw new Error(`Unsupported job type: ${jobType}`);
    }
  }
}
