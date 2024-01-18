import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import {AddressOption} from "../schemas/userAddress.schema";
export class CreateUserAddressDto {
    @IsNotEmpty()
    userId: string;

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

    @IsOptional()
    isActive: number;
}
