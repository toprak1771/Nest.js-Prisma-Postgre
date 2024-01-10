import { Injectable } from '@nestjs/common';
import prisma from 'src/utils/prisma';
import { CreateProductDto } from './productDto/create_product_dto';

@Injectable()
export class ProductService {
    public add(product:CreateProductDto){
        console.log("product:",product);
        return prisma.product.create({
            data:product
        })
    }
}
