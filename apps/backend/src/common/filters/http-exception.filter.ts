import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { DomainException } from '../exceptions';
import { STATUS_CODES } from 'node:http';

const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

// TODO: 추후 에러에 대한 로깅 추가
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof DomainException) {
      const status = exception.getStatus();
      return response.status(status).json({
        statusCode: status,
        data: exception.getResponse(),
      });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const domainException = new DomainException(
        status,
        exception.message,
        STATUS_CODES[status]
      );
      return response.status(status).json({
        statusCode: status,
        data: domainException.getResponse(),
      });
    } else {
      const domainException = new DomainException(
        500,
        (exception as Error)?.message ?? 'Unknown error occurred.',
        UNKNOWN_ERROR
      );
      return response.status(500).json({
        statusCode: 500,
        data: domainException.getResponse(),
      });
    }
  }
}
