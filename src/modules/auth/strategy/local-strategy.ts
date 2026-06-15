import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "userName" });
  };

  async validate(username: string, password: string) {
    console.log(username, password);
    const user = await this.authService.login({ userName: username, password });
    return user;
  }
}
