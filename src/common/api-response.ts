import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ApiResponse<T = any> {
  constructor(code = 200, message?: string, data?: T, total?: number) {
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

  static ok<T = any>(data?: T, message?: string) {
    return new ApiResponse(200, message || "成功", data);
  }

  static paginated<T = any>(data: T[], total: number, message?: string) {
    return new ApiResponse(200, message || "成功", data, total);
  }

  static fail<T = any>(message?: string, code = 500, data?: T) {
    return new ApiResponse(code, message || "失败", data);
  }
}
export class PageResult<T> {
  constructor(
    public readonly list: T[],
    public readonly total: number,
  ) {}
}
