import { Injectable } from '@nestjs/common'
import prisma from 'src/utils/prisma'
import { CreateProductDto } from './productDto/create_product_dto'
import { Product } from '@prisma/client'

@Injectable()
export class ProductService {
  public add(product: CreateProductDto) {
    console.log('product:', product)
    return prisma.product.create({
      data: product,
    })
  }

  public getAll(): Promise<Product[]> {
    return prisma.product.findMany({
      include: {
        user: true,
      },
    })
  }

  public update(Id: number, product: object): Promise<Product> {
    return prisma.product.update({
      where: {
        id: Id,
      },
      data: product,
    })
  }

  public delete(Id: number) :Promise<Product> {
    return prisma.product.delete({
      where: {
        id: Id,
      },
    })
   
  }
}
