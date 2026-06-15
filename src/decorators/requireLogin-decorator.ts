import { SetMetadata } from "@nestjs/common";

export const RequireLogin = () => {
  return SetMetadata("requireLogin", true);
};
