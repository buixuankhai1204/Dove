import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // disableErrorMessages: true,
      enableDebugMessages: true,
      // errorHttpStatusCode : HttpStatus.BAD_REQUEST,
  }
  ));
  await app.listen(3000);
}
bootstrap();
