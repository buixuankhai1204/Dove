import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { AuthGuard } from '../user/user.guard';
import {UserAddress} from "./schemas/userAddress.schema";
import {Roles} from "../roles.decorator";

@Controller('user-address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Post()
  @Roles(['User'])
  @UseGuards(AuthGuard)
  create(@Body() createUserAddressDto: CreateUserAddressDto): Promise<UserAddress> {
    return this.userAddressService.create(createUserAddressDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<UserAddress[]> {
    return this.userAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAddressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAddressDto: UpdateUserAddressDto) {
    return this.userAddressService.update(+id, updateUserAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAddressService.remove(+id);
  }
}
