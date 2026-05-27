import { ApiProperty } from "@nestjs/swagger";

export class ResultData {
  constructor(code = 200, msg?: string, data?: any) {
    this.code = code;
    this.msg = msg || "成功";
    this.data = data || null;
  }
  @ApiProperty({ type: "number", default: 200 })
  code: number;

  @ApiProperty({ type: "string", default: "成功" })
  msg?: string;

  data?: any;

  static ok(data?: any, msg?: string) {
    return new ResultData(200, msg || "成功", data);
  }
  static fail(data?: any, msg?: string) {
    return new ResultData(500, msg || "失败", data);
  }
}
