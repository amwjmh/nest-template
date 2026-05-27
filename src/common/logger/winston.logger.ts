import * as winston from "winston";
import { ConfigService } from "@nestjs/config";
import * as DailyRotateFile from "winston-daily-rotate-file";
import * as chalk from "chalk";

export const createWinstonLogger = (configService: ConfigService) => {
  const isProduction = configService.get("NODE_ENV") === "production";
  const logLevel = configService.get("LOG_LEVEL", "info");
  return winston.createLogger({
    level: logLevel,
    defaultMeta: {
      service: "api"
    },
    format: winston.format.combine(
      isProduction ? winston.format.json() : winston.format.printf(({ level, context, message, time }) => {
        const appStr = chalk.green(`[NEST]`);
        const contextStr = chalk.yellow(`[${context}]`);
        return `${appStr} ${level} ${time} ${contextStr} ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        dirname: "logs",
        filename: "logs/%DATE%.log",
        datePattern: "YYYY-MM-DD",
        level: "info",
        maxFiles: "14d"
      }),
      new DailyRotateFile({
        dirname: "logs",
        filename: "logs/error-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        level: "error",
        maxFiles: "30d"
      })
    ],
    exceptionHandlers: [
      new winston.transports.File({
        dirname: "logs",
        filename: "exceptions.log",
        level: "error"
      })
    ]
  });
};
