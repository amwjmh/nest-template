import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      clientID: configService.get("strategy.github.clientID"),
      clientSecret: configService.get("strategy.github.clientSecret"),
      callbackURL: configService.get("strategy.github.callbackURL"),
      scope: ["public_profile"]
    });
  };
  async validate(accessToken: string, refreshToken: string, profile: any) {
    return profile;
  }
}
