import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards, RawBodyRequest, Req, UploadedFiles, ParseFilePipeBuilder, HttpStatus
} from '@nestjs/common';
import { ImageService } from './image.service';
import { UpdateImageDto } from './dto/update-image.dto';
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "../user/user.guard";
import {diskStorage} from "multer";
import * as fs from "fs";
import {CreateImageDto} from "./dto/create-image.dto";
import {Image} from "./schemas/image.schema";
import {RemoveImageDto} from "./dto/Remove-image.dto";

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    cb(null, `${name}`);
  },
});

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}


  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('files',10, {storage}))
   async create(@UploadedFiles(
      new ParseFilePipeBuilder()
          .addFileTypeValidator({
            fileType: 'png',
          })
          // .addMaxSizeValidator({
          //   maxSize: 100000
          // })
          .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
          }),

  ) files: Array<Express.Multer.File> ): Promise<Image> {
    console.log(files)
    const imageDto: CreateImageDto = new CreateImageDto();
    imageDto.name = files[0].filename;
    imageDto.files = (files.map((file) => {
      return file.originalname;
    }));
    imageDto.type = "Images";
    imageDto.isActive = 1;
    console.log("imageDto: " + imageDto)
    return await this.imageService.create(imageDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Body() removeDto: RemoveImageDto) {
    // await fs.unlink('./uploads/Screenshot from 2024-01-17 10-32-09', ()=> {
    // })
    return this.imageService.remove(removeDto);
  }
}
