import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {Category} from "./schemas/category.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model, PipelineStage} from "mongoose";
import {Filtering, Pagination, Service, Sorting} from "../decorators/baseService.decorator";

@Injectable()
export class CategoryService extends Service<Category>{
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {
    super(categoryModel);
  }
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create(createCategoryDto);
  }

  // async findAll(filter: Filtering, sort: Sorting, pagination: Pagination): Promise<Category[]> {
  //   const categories: Category[] = await  this.categoryModel.find(filter);
  //   if(categories === null) {
  //     throw new BadRequestException("can not find any category, please check it again", {cause: new Error(), description: "Some error description"})
  //   }
  //
  //   return categories;
  // }

  async findOne(id: string): Promise<Category> {
    const category: Category = await this.categoryModel.findById(id);
    if(category === null) {
      throw new BadRequestException('id of category does not exist, please check this again', {cause: new Error(), description: "Some error description"});
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category: Category = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {new: true});
    if(category === null) {
      throw  new BadRequestException('id of category does not exist, please check this again', {cause: new Error(), description: "Some error description"});
    }

    return category;
  }

  async remove(id: string) {
    const deletedCategory: Category = await this.categoryModel.findByIdAndUpdate(id, {isActive: 0}, {new: true});
    if(deletedCategory === null) {
      throw  new BadRequestException('id of category does not exist, please check this again', {cause: new Error(), description: "Some error description"});
    }

    return deletedCategory;
  }
}
