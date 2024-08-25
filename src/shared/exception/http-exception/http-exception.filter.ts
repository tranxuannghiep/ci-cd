import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { CODE_ERROR_RESPONSE } from '../exception/exception.enum';
import { LoggerFactoryService } from 'src/shared/logger';
import { LoggerService } from 'src/shared/logger';
import { CustomException } from '../exception';
import { CUSTOM_ERROR_CODES } from '../exception/exception.enum';
import { JwtAccessTokenClaims } from 'src/shared/auth';
import { resolveGatewayHeaders } from 'src/shared/header';
import { formatSequelizeError } from 'src/shared/log-formater';
import { AxiosError } from 'axios';

export interface HttpExceptionResponse {
  statusCode: number;
  code: string;
  message: string;

  errorDetails?: Record<string, any>;
  errors?: string[];
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private logger: LoggerService;

  constructor(logFactory: LoggerFactoryService) {
    super();
    this.logger = logFactory.createLogger(HttpExceptionFilter.name);
  }

  catch(exception: HttpException | Error | AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { referer, userAgent, clientIp } = resolveGatewayHeaders(
      request.headers,
    );

    const path = request?.route?.path ? request.route.path : request.url;
    const caller = (request as any)?.user as JwtAccessTokenClaims;

    let customCode: string = CODE_ERROR_RESPONSE.INTERNAL_SERVER_ERROR;
    let errorString = 'Something went wrong in our end!';
    let errorDetails = undefined;

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof CustomException) {
      httpStatus = exception.protocolInfo.httpCode;
      if (httpStatus < HttpStatus.INTERNAL_SERVER_ERROR) {
        customCode = CUSTOM_ERROR_CODES.PROBLEM_WITH_REQUEST;
      }
      customCode = exception.info?.code || customCode;

      errorString = exception.message || errorString;
      errorDetails = exception.info?.errorDetails;
    } else if (exception instanceof HttpException) {
      // this is the legacy implementation
      customCode = exception.message;
      // Todo: remove this migration stuffs
      if (httpStatus == HttpStatus.BAD_REQUEST && !customCode) {
        customCode = CODE_ERROR_RESPONSE.BAD_REQUEST;
      }

      if (httpStatus >= 400 && httpStatus < 500) {
        errorString = exception.message;
      }
    }

    const dataLog = {
      path,
      userId: caller?.userId,
      network: {
        client: {
          ip: clientIp,
        },
      },
      http: {
        url: path,
        method: request?.method,
        query: request.query,
        params: request.params,
        body: request.body,
        useragent: userAgent,
        referer,
      },
    };

    exception = formatSequelizeError(exception);

    if (
      [
        HttpStatus.INTERNAL_SERVER_ERROR,
        HttpStatus.NOT_IMPLEMENTED,
        HttpStatus.SERVICE_UNAVAILABLE,
      ].includes(httpStatus)
    ) {
      this.logger.critical(
        `${request?.method} request to ${path} failed`,
        dataLog,
        // exception,
      );
    } else {
      this.logger.warn(
        `${request?.method} request to ${path} failed`,
        dataLog,
        // exception,
      );
    }

    const errorResponse = this.getErrorResponse(
      request,
      httpStatus,
      customCode,
      errorString,
      errorDetails,
    );
    response.status(httpStatus).json(errorResponse);
  }

  private getErrorResponse = (
    request: Request,
    httpStatus: HttpStatus,
    customCode: string,
    message: string,
    errorDetails: Record<string, unknown> | null,
  ): CustomHttpExceptionResponse => {
    // Todo: remove the errors migration when app migrated to use errorDetails.
    let errors = undefined;
    if (errorDetails?.protectorValidationErrors) {
      errors = errorDetails.protectorValidationErrors;
    }

    return {
      statusCode: httpStatus,

      code: customCode,
      message,
      errorDetails,

      path: request.url,
      method: request.method,
      timeStamp: new Date(),

      errors: errors,
    };
  };
}
