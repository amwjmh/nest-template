import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { WinstonLogger } from "../logger/logger.service";
import * as dayjs from "dayjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: WinstonLogger) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const start = dayjs().unix();
    const { method, path, body, query } = request;
    this.logger.log(`Incoming Request: ${method} ${path} | Body: ${JSON.stringify(body)} | Query: ${JSON.stringify(query)}`, "HTTP");
    return next.handle().pipe(
      tap((data) => {
        const duration = dayjs().unix() - start;
        this.logger.log(`Response: ${method} ${path} ${duration}ms | Data: ${JSON.stringify(data)}`, "HTTP");
      })
    );
  }
}
