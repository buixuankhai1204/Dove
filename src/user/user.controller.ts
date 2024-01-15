import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, FindOneParams } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import {SignInDto} from "./dto/sign-in.dto";
import { AuthGuard } from './user.guard';
import { Roles } from '../roles.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private  readonly configService : ConfigService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(['User'])
  @UseGuards(AuthGuard)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: FindOneParams) {
    return this.userService.findOne(param.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post()
  async createBulk(@Body(new ParseArrayPipe({items: CreateUserDto})) createUserDtos: CreateUserDto[]): Promise<Array<User>> {
    return this.userService.createBulk(createUserDtos)
  }

  @Post('signIn')
  async signIn(@Body() signInDto : SignInDto): Promise<{accessToken: string}> {
    return this.userService.signIn(signInDto.username,signInDto.password);
  }
}
