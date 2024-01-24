import {IsNotEmpty, IsOptional} from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    paymentMethod: string

    @IsNotEmpty()
    amount: string

    @IsOptional()
    paymentDate: Date
}
