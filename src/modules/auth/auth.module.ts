import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AutoController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local-strategy";
import { GithubStrategy } from "./strategy/github.strategy";

@Module({
  imports: [UserModule],
  controllers: [AutoController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    GithubStrategy
  ],
  exports: []
})
export class AuthModule { }
