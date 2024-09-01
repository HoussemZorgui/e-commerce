import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from 'src/orders/interfaces/order.interface';
import { IProduct } from 'src/products/interfaces/product.interface';
import { CreateOrderproductDto } from './dto/create-orderproduct.dto';
import { UpdateOrderproductDto } from './dto/update-orderproduct.dto';
import { IOrderproduct } from './interfaces/orderproduct.interface';

@Injectable()
export class OrderproductService {

  constructor (
    @InjectModel('orderproducts')
    private orderproductModel:Model<IOrderproduct>,
  @InjectModel('orders')
  private orderModel:Model<IOrder>,
  @InjectModel('products')
  private productModel:Model<IProduct>
    ){}

  async createOrderproduct(createOrderproductDto: CreateOrderproductDto):Promise<IOrderproduct> {
   const newOrderproduct =  new this.orderproductModel(createOrderproductDto);
   await this.orderModel.updateOne({_id:createOrderproductDto.order},
    {$push:{orderproducts:newOrderproduct._id}})
    await this.productModel.updateOne({_id:createOrderproductDto.product},
      {$push:{orderproducts:newOrderproduct._id}})
   return newOrderproduct.save()
  }

  findAll() {
    return `This action returns all orderproduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderproduct`;
  }

  update(id: number, updateOrderproductDto: UpdateOrderproductDto) {
    return `This action updates a #${id} orderproduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderproduct`;
  }
}
