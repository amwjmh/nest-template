import { Module, Global } from "@nestjs/common";
import { AppConfigService } from "./services/app-config.service";

@Global()
@Module({
  imports: [],
  providers: [AppConfigService],
  exports: [AppConfigService]
})

export class SharedModule {}
