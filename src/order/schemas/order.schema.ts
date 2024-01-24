import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
import {ProductQuantityOrder} from "../dto/create-order.dto";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
    @Prop({required: true})
    userId: string

    @Prop({required: true})
    paymentId: string

    @Prop({required: true})
    addressId: string

    @Prop()
    product: ProductQuantityOrder

    @Prop()
    total: string

    @Prop()
    note: string

    @Prop({default: 0})
    isActive: number

    @Prop({default: Date.now()})
    createdAt: Date

    @Prop({default: Date.now()})
    updatedAt: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order);
