import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {HttpStatus, ValidationPipe} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // disableErrorMessages: true,
      enableDebugMessages: true,
      errorHttpStatusCode : HttpStatus.BAD_REQUEST,
  }
  ));
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('database1.port'));
}
bootstrap();
