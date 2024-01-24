import {BadRequestException, Injectable} from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import {InjectModel} from "@nestjs/mongoose";
import {PaymentMethod} from "./schemas/payment-method.schma";
import {Model} from "mongoose";
import {Service} from "../decorators/baseService.decorator";

@Injectable()
export class PaymentMethodService extends Service<PaymentMethod>{
  constructor(@InjectModel(PaymentMethod.name) private paymentMethodModel: Model<PaymentMethod>) {
    super(paymentMethodModel);
  }

  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const paymentMethod: PaymentMethod = await this.paymentMethodModel.create(createPaymentMethodDto);

    if(paymentMethod === null) {
      throw new BadRequestException("some thing went wrong!");
    }
    return paymentMethod;
  }

  // findAll() {
  //   return `This action returns all paymentMethod`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} paymentMethod`;
  // }

  update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return `This action updates a #${id} paymentMethod`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} paymentMethod`;
  // }
}
