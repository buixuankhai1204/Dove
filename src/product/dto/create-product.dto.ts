import {IsNotEmpty, IsNumber, IsNumberString, IsOptional, MaxLength, MinLength} from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    name: string

    @IsNotEmpty()
    imageId: string

    @IsNotEmpty()
    categoryId: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    size: string[]

    @IsNotEmpty()
    color: string[]

    @IsNotEmpty()
    @IsNumberString()
    price: string

    @IsOptional()
    @IsNumber()
    isActive: number
}

