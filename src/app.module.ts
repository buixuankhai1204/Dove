import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserAddressModule } from './user-address/user-address.module';
import { CategoryModule } from './category/category.module';
// import configuration from 'config/configuration';
import databaseConfig from '../config/database.config';
import * as Joi from 'joi';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    UserAddressModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      load: [databaseConfig], cache: true,

      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_USER: Joi.string().default('xuankhai'),
        DATABASE_PASSWORD: Joi.string().default('bxk180621'),
        HOST: Joi.string().default('localhost'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    UserAddressModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
