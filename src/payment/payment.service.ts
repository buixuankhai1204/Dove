import {BadRequestException, Injectable} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {Service} from "../decorators/baseService.decorator";
import {Payment} from "./schemas/payment.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class PaymentService extends Service<Payment>{
  constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>) {
    super(paymentModel);
  }
  async create(createPaymentDto: CreatePaymentDto) {
    const payment: Payment = await this.paymentModel.create(createPaymentDto);

    if(payment === null) {
      throw new BadRequestException("some thing went wrong!");
    }
    return payment;
  }

  // findAll() {
  //   return `This action returns all payment`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} payment`;
  // }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} payment`;
  // }
}
