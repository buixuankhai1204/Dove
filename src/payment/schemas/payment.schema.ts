import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
    @Prop({unique: true, required: true})
    userId: string

    @Prop({unique: true, required: true})
    paymentMethod: string

    @Prop()
    amount: string

    @Prop({default: Date.now()})
    paymentDate: Date

    @Prop({default: 0})
    isActive: number

    @Prop({default: Date.now()})
    createdAt: Date

    @Prop({default: Date.now()})
    updatedAt: Date
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
