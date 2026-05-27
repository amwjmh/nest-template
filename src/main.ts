import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { log4Middleware } from "./middleware/log4.middleware";
import { WinstonLogger } from "./common/logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  // app.use(log4Middleware);
  const winstonLogger = app.get<WinstonLogger>(WinstonLogger);
  app.useLogger(winstonLogger);
  winstonLogger.log("Nest-Admin is running on port 3000");

  const swaggerOptions = new DocumentBuilder().setTitle("Nest-Admin");
  const document = SwaggerModule.createDocument(app, swaggerOptions.build());
  SwaggerModule.setup("/swagger-ui", app, document);

  await app.listen(3000);

  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept();
    // @ts-ignore
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
