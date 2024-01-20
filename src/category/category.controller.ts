import {Controller, Get, Post, Body, Patch, Param, Delete, Logger} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {Category} from "./schemas/category.schema";
import {
  Filtering,
  FilteringParams,
  Pagination,
  PaginationParams,
  Sorting,
  SortingParams
} from "../decorators/baseService.decorator";

@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto):Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()

  findAll(
      @PaginationParams() paginationParams: Pagination,
      @SortingParams(['name', 'id', 'stateId']) sort?: Sorting,
      @FilteringParams(['name', 'id', 'stateId']) filter?: Filtering
  ): Promise<Category[]> {
    this.logger.log(`REST request to get cities: ${JSON.stringify(paginationParams)}, ${sort}, ${filter}`);
    return this.categoryService.findAll(filter, sort, paginationParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Category> {
    return this.categoryService.remove(id);
  }
}
