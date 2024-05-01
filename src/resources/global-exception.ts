import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ConsoleLogger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalException implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private nativeLogger: ConsoleLogger,
  ) {}

  catch(excpetion: unknown, host: ArgumentsHost) {
    // nativeLogger.er('hahahaah', excpetion);
    this.nativeLogger.error(excpetion);

    const { httpAdapter } = this.adapterHost;

    const context = host.switchToHttp();
    const response = context.getResponse();
    const req = context.getRequest();

    const { status, body } =
      excpetion instanceof HttpException
        ? {
            status: excpetion.getStatus(),
            body: excpetion.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(req),
            },
          };

    httpAdapter.reply(response, body, status);
  }
}
