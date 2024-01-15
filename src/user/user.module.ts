import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from "./schemas/user.schema";
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';


@Module({
  imports: [MongooseModule.forFeature([{name : User.name, schema: UserSchema}]),
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
