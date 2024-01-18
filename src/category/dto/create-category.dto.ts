import {
    isNotEmpty,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    maxLength,
    MaxLength,
    minLength,
    MinLength
} from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    name: string

    @IsOptional()
    @MinLength(5)
    @MaxLength(200)
    description: string

    @IsNotEmpty()
    @IsNumber()
    isActive: number
}
