import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as shortid from 'shortid';

export const Log = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const response = ctx.switchToHttp().getResponse();
  const logger = new Logger();
  const shortCode = shortid.generate();

  logger.log(
    `start request - ${request.method} ${request.url} ID ${shortCode}`,
  );

  const now = Date.now();
  const onFinish = () => {
    const elapsedTime = Date.now() - now;
    logger.log(
      `end request - ${request.method} ${request.url} ID ${shortCode} - Time: ${elapsedTime}ms`,
    );
  };

  response.once('finish', onFinish);

  return { request, response };
});
