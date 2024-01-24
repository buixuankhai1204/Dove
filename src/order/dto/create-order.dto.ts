import {IsNotEmpty, IsOptional, Length} from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    paymentId: string

    @IsNotEmpty()
    addressId: string

    @IsNotEmpty()
    product: ProductQuantityOrder[]

    @IsOptional()
    @Length(5,200)
    Note: string

    @IsOptional()
    total: number;
}

export class ProductQuantityOrder {
    productId: string;
    quantity: number;
    price?: number;
    subTotal?: number
}
