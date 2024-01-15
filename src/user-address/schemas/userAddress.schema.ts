import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {Types,HydratedDocument, SchemaTypes} from 'mongoose';
import {User} from "../../user/schemas/user.schema";
export type UserAddressSchema = HydratedDocument<UserAddress>;

export enum AddressOption {
    ACTIVE = "ACTIVE",
    INACTIVE = "IN_ACTIVE",
}

export class UserAddress {
    @Prop({type: SchemaTypes.ObjectId, ref: User.name})
    userId: Types.ObjectId;

    @Prop({required: true})
    address: string;

    @Prop({required: true})
    phoneNumber: string;

    @Prop({default: AddressOption.INACTIVE})
    isDefault: AddressOption

    @Prop({default: Date.now()})
    createdAt: Date

}

export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);
