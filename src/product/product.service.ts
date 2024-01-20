import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {Product} from "./schemas/product.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Service} from "../decorators/baseService.decorator";

@Injectable()
export class ProductService extends Service<Product>{
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
    super(productModel);
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product: Product = await this.productModel.create(createProductDto);
    if(product === undefined) {
      throw new BadRequestException("can not create this product, please check again!")
    }

    return product;
  }

  // findAll() {
  //   return `This action returns all product`;
  // }

  async findOne(id: string): Promise<Product> {
    const product: Product[] = await this.productModel.find({_id: id, isActive: 1});
    if(product === null) {
      throw new BadRequestException('id of product does not exist, please check this again', {cause: new Error(), description: "Some error description"});
    }

    return product[0]
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const deleteProduct: Product = await this.productModel.findByIdAndUpdate(id, {isActive: 0}, {new: true});
    if(deleteProduct === null) {
      throw new BadRequestException('id of product does not exist, please check this again', {cause: new Error(), description: "Some error description"});
    }

    return deleteProduct;
  }
}
