import {
    IsEmail, IsEnum,
    IsNotEmpty,
    IsNumber, IsOptional,
    IsPhoneNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import {AddressOption} from "../schemas/userAddress.schema";
import mongoose from "mongoose";
export class CreateUserAddressDto {
    @IsNotEmpty()
    userId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @MinLength(5, {message: "address of User can not create with length less than 5"})
    @MaxLength(30, {message: "address of user can not create with length greater than 50"})
    address: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsEnum(AddressOption)
    @IsNotEmpty()
    isDefault: AddressOption;
}
