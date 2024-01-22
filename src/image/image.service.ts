import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import {Image} from "./schemas/image.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {RemoveImageDto} from "./dto/Remove-image.dto";
import {Category} from "../category/schemas/category.schema";
import * as fs from "fs";

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {
  }
  async create(createImageDto: CreateImageDto): Promise<Image> {
    return await this.imageModel.create(createImageDto);
  }

  async findAll(): Promise<Image[]> {
    const images: Image[] = await this.imageModel.find();
    if(images === null) {
      throw new BadRequestException("some error in database!");
    }

    return images;
  }

  async findOne(id: string) {
    const image: Image = await this.imageModel.findById(id);
    if(image === null) {
      throw new BadRequestException('id of image does not exist, please check this again', {cause: new Error(), description: "Some error description"});
    }

    return image;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  async remove(removeImageDto: RemoveImageDto) {

    const image: Image = await this.findOne(removeImageDto.id);
    const newFile: string[] = [];
    for (const file of image.files) {
      if(file !== removeImageDto.name) {
        newFile.push(file)
      }
    }
    image.files = newFile;
    console.log(image);

    await this.imageModel.findByIdAndUpdate(removeImageDto.id, image);
    await fs.unlink(removeImageDto.name, ()=> {
    })
  }
}
