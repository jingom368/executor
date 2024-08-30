export class JobCompletionFactory {
  getJobCompletionHandler(jobType: string): new () => JobCompletionHandler {
    switch (jobType) {
      case 'IMAGE_RENDERING':
        return new ImageRenderingGroupJobCompletionHandler();
      case 'PDF_RENDERING':
        return new PdfRenderingGroupJobCompletionHandler();
      default:
        throw new Error(`Unsupported job type: ${jobType}`);
    }
  }
}
