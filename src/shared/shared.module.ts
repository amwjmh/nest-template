import { Module, Global } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AppConfigService } from "./services/app-config.service";

@Global()
@Module({
  imports: [JwtModule.register({ secret: "guang", signOptions: { expiresIn: "1d" } })],
  providers: [AppConfigService],
  exports: [AppConfigService, JwtModule]
})

export class SharedModule {}
