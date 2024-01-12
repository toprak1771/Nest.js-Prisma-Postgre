import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './userDto/create_user_dto'
import prisma from 'src/utils/prisma'
import { User } from '@prisma/client'

@Injectable()
export class UserService {
  getHello(): string {
    return 'Merhaba Nest.js'
  }

  getCustomMessage(): string {
    return 'Özel merhaba Nest.js!'
  }

  public register(user: CreateUserDto) {
    console.log('user:', user)
    return prisma.user.create({
      data: user,
    })
  }

  public findOne(email: string): Promise<User> {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  }

  public getAll() : Promise<User[]>{
    return prisma.user.findMany({
      include:{
        products:true
      }
    })
  }
}
