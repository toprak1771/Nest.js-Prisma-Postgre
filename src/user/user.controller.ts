import { Req, Body, Controller, Get, Post, Res, HttpStatus, UseGuards } from '@nestjs/common'
import { Response, Request } from 'express'
import { UserService } from './user.service'
import { CreateUserDto } from './userDto/create_user_dto'
import { LoginUserDto } from './userDto/login_user_dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from 'src/utils/auth.guard'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  public async registerUser(@Body() user: CreateUserDto, @Res() res: Response) {
    try {
      user.password = await bcrypt.hash(user.password, 10)
      const _saveUser = await this.userService.register(user)
      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        userId: _saveUser.id,
        email: _saveUser.email,
      })
    } catch (error) {
      console.log('error:', error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  @Post('login')
  public async login(@Body() loginSchema: LoginUserDto, @Res() res: Response) {
    try {
      const _user = await this.userService.findOne(loginSchema.email)
      if (!_user) {
        return res.status(HttpStatus.BAD_REQUEST).send('Cannot find user with this username')
      }
      const comparePasssword = await bcrypt.compare(loginSchema.password, _user.password)
      if (comparePasssword) {
        const payload = { Id: _user.id, mail: _user.email, role: _user.role }
        const access_token = await this.jwtService.signAsync(payload)
        return res.json({
          userId: _user.id,
          email: _user.email,
          access_token: access_token,
        })
      }
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: 'error',
        message: 'Wrong password',
      })
    } catch (error) {
      console.log('error:', error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  public async getAllUsers(@Res() res: Response): Promise<object> {
    try {
      const users = await this.userService.getAll()
      console.log('users:', users)
      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        users: users,
      })
    } catch (error) {
      console.log('error:', error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  @UseGuards(AuthGuard)
  @Post('order')
  public async postOrder(@Req() req: Request, @Res() res: Response): Promise<object> {
    try {
      const order = req.body
      const userId = req['user'].Id
      const addOrder = await this.userService.order(order, userId)
      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        order: addOrder,
      })
    } catch (error) {
      console.log('error:', error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        error: error.message,
      })
    }
  }

  @UseGuards(AuthGuard)
  @Get('order')
  public async getAllOrder(@Req() req: Request, @Res() res: Response): Promise<object> {
    try {
      const orders = await this.userService.getOrder()
      //console.log('orders:', orders)
      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        orders: orders,
      })
    } catch (error) {
      console.log('error:', error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        error: error.message,
      })
    }
  }
}
