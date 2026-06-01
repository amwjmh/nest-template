import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { Response } from "express";
import { ApiResponse } from "../api-response";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === "string") {
        message = res;
      } else {
        const errorResponse = res as Record<string, any>;
        // 处理 class-validator 抛出的数组错误
        message = Array.isArray(errorResponse.message)
          ? errorResponse.message.join(", ")
          : errorResponse.message || "Request failed";
      }
    }
    // HTTP 状态码保持真实，Body 内也携带 code 便于前端统一处理
    response.status(status).json(ApiResponse.fail(message, status,));
  }
}
