import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    console.log(this.reflector);
    const requireLogin = this.reflector.getAllAndOverride("requireLogin", [context.getClass(), context.getHandler()]);
    if (!requireLogin) return true;
    const path = request.route?.path;
    if (path && (path.includes("login") || path.includes("register"))) {
      return true;
    }
    if (!authorization) {
      throw new UnauthorizedException("用户未登录");
    }
    try {
      const token = authorization.split(" ")[1];
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException("token无效");
    }
  }
}
