import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
export type UserAddressDocument = HydratedDocument<UserAddress>;

export enum AddressOption {
    ACTIVE = "ACTIVE",
    INACTIVE = "IN_ACTIVE",
}

@Schema()
export class UserAddress {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    userId: string;

    @Prop({required: true})
    address: string;

    @Prop({required: true})
    phoneNumber: string;

    @Prop({default: AddressOption.INACTIVE})
    isDefault: AddressOption

    @Prop({default: Date.now()})
    createdAt: Date

    @Prop({default: 1})
    isActive: number

}

export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);
