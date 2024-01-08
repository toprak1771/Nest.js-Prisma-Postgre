import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common'
import { Response } from 'express';
import { UserService } from './user.service'
import { CreateUserDto } from './userDto/create_user_dto'
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getHello(): string {
    return this.userService.getHello()
  }

  @Get('Custom')
  getCustomMessage(): string {
    return this.userService.getCustomMessage()
  }

  @Post()
  public async registerUser(@Body() user: CreateUserDto,@Res() res:Response) {
    try {
      user.password = await bcrypt.hash(user.password,10);
      const _saveUser = await this.userService.register(user);
      res.status(HttpStatus.CREATED).json({
        status:"success",
        userId:_saveUser.id,
        email:_saveUser.email,
      })
    } catch (error) {
      console.log("error:",error);
    }
  }
}
