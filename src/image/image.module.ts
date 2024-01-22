import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Image, ImageSchema} from "./schemas/image.schema";
import {MulterModule} from "@nestjs/platform-express";

@Module({
  imports: [MongooseModule.forFeature([{name: Image.name, schema: ImageSchema}])
    , MulterModule.register({
    dest: './upload',
  })],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
