import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import {AddressOption, UserAddress} from "./schemas/userAddress.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {HttpException} from '@nestjs/common'

@Injectable()
export class UserAddressService {
  constructor(@InjectModel(UserAddress.name) private userAddressModel: Model<UserAddress>){}

  async create(createUserAddressDto: CreateUserAddressDto): Promise<UserAddress> {
    const userAddress : UserAddress = await this.userAddressModel.create(createUserAddressDto);
    return userAddress;
  }

  async findAll() {
    const listUsers: UserAddress[] = await this.userAddressModel.find({isActive: 1});
    if(listUsers) return listUsers;
  }

  async setDefaultAddress(userId: string, addressId: string): Promise<UserAddress> {
    const addressUser: UserAddress = await this.userAddressModel.findOneAndUpdate({userId: userId, isDefault: AddressOption.ACTIVE, isActive: 1}, {isDefault: AddressOption.INACTIVE}, {new : true});
    if(addressUser === null) {
      throw  new BadRequestException('something bad happened', {cause: new Error(), description: "Some error description"});
    }

    const newAddressDefault = await this.userAddressModel.findOneAndUpdate({_id: addressId, isDefault: AddressOption.INACTIVE, isActive: 1}, {isDefault: AddressOption.ACTIVE}, {new : true});

    if(newAddressDefault) return newAddressDefault;
  }

  async findOne(id: string): Promise<UserAddress> {
    const userAddress: UserAddress = await  this.userAddressModel.findById(id);
    if(userAddress === null) {
      throw  new BadRequestException('id of address does not exist, please check this again', {cause: new Error(), description: "Some error description"});
    }

    return userAddress;
  }

  update(id: number, updateUserAddressDto: UpdateUserAddressDto) {
    return `This action updates a #${id} userAddress`;
  }

  async remove(id: string): Promise<UserAddress> {
    const deleteAddressUser: UserAddress = await this.userAddressModel.findByIdAndUpdate(id, {isActive: 0}, {new: true});
    if(deleteAddressUser === null) {
      throw  new BadRequestException('id of address does not exist, please check this again', {cause: new Error(), description: "Some error description"});
    }

    return deleteAddressUser;
  }
}
