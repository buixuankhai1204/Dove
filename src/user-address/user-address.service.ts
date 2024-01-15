import {Injectable, UseGuards} from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import {UserAddress} from "./schemas/userAddress.schema";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model, Schema} from "mongoose";

@Injectable()
export class UserAddressService {
  constructor(@InjectModel(UserAddress.name) private userAddressModel: Model<UserAddress>){};
  async create(createUserAddressDto: CreateUserAddressDto): Promise<UserAddress> {
    console.log(createUserAddressDto)
    return await this.userAddressModel.create(createUserAddressDto);
  }

  async findAll() {
    const listUsers: UserAddress[] = await this.userAddressModel.find();
    if(listUsers) return listUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAddress`;
  }

  update(id: number, updateUserAddressDto: UpdateUserAddressDto) {
    return `This action updates a #${id} userAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAddress`;
  }
}
