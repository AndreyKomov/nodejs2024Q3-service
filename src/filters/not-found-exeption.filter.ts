import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(NotFoundExceptionFilter.name, {
    timestamp: true,
  });

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const { method, url, query, body } = request;
    const status = exception.getStatus() || HttpStatus.NOT_FOUND;
    const message = exception.message || 'Resource not found';

    this.logger.warn(
      `[NOT FOUND]: "METHOD":${method} "URL":${url} "QUERY":${JSON.stringify(
        query,
      )} "BODY":${JSON.stringify(body)}`,
    );

    return response.status(status).json({
      statusCode: status,
      message,
    });
  }
}