import {IsNotEmpty, IsOptional, MaxLength, MinLength} from "class-validator";

export class CreateImageDto {
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(200)
    name: string

    @IsNotEmpty()
    prefix: string

    @IsNotEmpty()
    files: string[]

    @IsNotEmpty()
    type: string

    @IsOptional()
    isActive: number
}
