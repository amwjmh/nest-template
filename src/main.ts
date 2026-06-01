import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { WinstonLogger } from "./common/logger/logger.service";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { HttpExceptionFilter } from "./common/filters/http.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  const winstonLogger = app.get<WinstonLogger>(WinstonLogger);
  app.useLogger(winstonLogger);
  winstonLogger.log("Nest-Admin is running on port 3000");

  const swaggerOptions = new DocumentBuilder().setTitle("Nest-Admin");
  const document = SwaggerModule.createDocument(app, swaggerOptions.build());
  SwaggerModule.setup("/swagger-ui", app, document);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

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
