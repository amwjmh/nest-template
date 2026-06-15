import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponse } from "../api-response";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        // 已包装过的不再处理（兼容手动返回 ApiResponse 的场景）
        if (data instanceof ApiResponse) {
          return data;
        }
        // 普通对象 / 数组
        return ApiResponse.ok(data);
      }),
    );
  }
}
