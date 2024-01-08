import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './userDto/create_user_dto'
import prisma from 'src/utils/prisma'

@Injectable()
export class UserService {
  getHello(): string {
    return 'Merhaba Nest.js'
  }

  getCustomMessage(): string {
    return 'Özel merhaba Nest.js!'
  }

  public register(user: CreateUserDto) {
    return prisma.user.create({
      data: user,
    })
  }
}
