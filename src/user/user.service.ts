import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './userDto/create_user_dto'
import { CreateOrderDto } from './userDto/create_order_dto'
import prisma from 'src/utils/prisma'
import { Order, User } from '@prisma/client'

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

  public getAll(): Promise<User[]> {
    return prisma.user.findMany({
      include: {
        products: true,
      },
    })
  }

  public order(order: CreateOrderDto[], userId: number) {
    return prisma.order.create({
      data: {
        userId: userId,
        ordersProducts: {
          create: order.map((_order) => ({
            createdAt: new Date(),
            quantity: _order.quantity,
            product: {
              connect: {
                id: _order.productId,
              },
            },
          })),
        },
      },
    })
  }

  public getOrder():Promise<Order[]> {
    return prisma.order.findMany({
      include: {
        user: true,
        ordersProducts: {
          include: {
            product: true,
          },
        },
      },
    })
  }
}
