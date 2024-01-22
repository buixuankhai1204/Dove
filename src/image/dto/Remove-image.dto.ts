import {IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class RemoveImageDto {
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(200)
    name: string

    @IsNotEmpty()
    id: string
}
