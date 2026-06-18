import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ApiResponse<T = any> {
  constructor(code = 200, message?: string, data?: T) {
    this.code = code;
    this.message = message || "成功";
    this.data = data || null;
  }

  @ApiProperty({ type: "number", default: 200 })
  code: number;

  @ApiProperty({ type: "string", default: "成功" })
  message: string;

  data?: T;

  @ApiPropertyOptional({ type: "number", default: 0 })
  total?: number;

  static ok<T = any>(data?: T, message?: string, total?: number) {
    if (total) {
      const list = new PageResult<T>(data, total);
      return new ApiResponse(200, message || "成功", list);
    } else {
      return new ApiResponse(200, message || "成功", data);
    }
  }

  static fail<T = any>(message?: string, code = 500, data?: T) {
    return new ApiResponse(code, message || "失败", data);
  }
}
export class PageResult<T> {
  constructor(list: T, total: number) {
    this.list = list;
    this.total = total || 0;
  }

  list?: T;

  @ApiPropertyOptional({ type: "number", default: 0 })
  total?: number;
}
