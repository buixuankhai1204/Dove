import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
export type PaymentMethodDocument = HydratedDocument<PaymentMethod>;

@Schema()
export class PaymentMethod {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop({default: 0})
    isActive: number

    @Prop({default: Date.now()})
    createdAt: Date

    @Prop({default: Date.now()})
    updatedAt: Date
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
