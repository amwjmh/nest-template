import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AutoController } from "./auto.controller";
import { AutoService } from "./auto.service";

@Module({
  imports: [UserModule],
  controllers: [AutoController],
  providers: [
    AutoService
  ],
  exports: []
})
export class AutoModule { }
