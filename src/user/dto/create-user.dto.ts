import {Prop} from "@nestjs/mongoose";

export class CreateUserDto {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: string;
}
