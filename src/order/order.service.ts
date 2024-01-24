import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Order} from "./schemas/order.schema";
import {Service} from "../decorators/baseService.decorator";

@Injectable()
export class OrderService extends Service<Order>{
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {
    super(orderModel)
  }


  async create(createOrderDto: CreateOrderDto) {
    let total: number = 0;
    for (const productOrder of createOrderDto.product) {
        productOrder.subTotal = productOrder.price * productOrder.quantity
        total += productOrder.subTotal;
    }
    createOrderDto.total = total;

    const order: Order = await this.orderModel.create(createOrderDto);

    if(order === null) {
      throw new BadRequestException("some thing went wrong!");
    }
    return order;
  }

  // findAll() {
  //   return `This action returns all order`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
