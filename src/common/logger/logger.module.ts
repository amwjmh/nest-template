import { Global, Module, LoggerService } from "@nestjs/common";
import { WinstonLogger } from "./logger.service";

@Global()
@Module({
  providers: [WinstonLogger],
  exports: [WinstonLogger]
})
export class LoggerModule {}
