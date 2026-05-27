import { Injectable, Scope, LoggerService } from "@nestjs/common";
import * as winston from "winston";
import { createWinstonLogger } from "./winston.logger";
import { ConfigService } from "@nestjs/config";
import * as dayjs from "dayjs";

@Injectable()
export class WinstonLogger implements LoggerService {
  private context: string;

  private readonly logger: winston.Logger;

  constructor(configService: ConfigService) {
    this.logger = createWinstonLogger(configService);
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: string) {
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
    this.logger.info(message, { context: context || this.context, time });
  }
  error(message: string, trace?: string, context?: string) {
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
    this.logger.error(message, { context: context || this.context, time, trace });
  }
  warn(message: string, context?: string) {
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss");
    this.logger.warn(message, { context: context || this.context, time });
  }
}
