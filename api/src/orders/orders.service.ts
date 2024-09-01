import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class OrdersService {

  constructor (
    @InjectModel('orders')
    private orderModel:Model<IOrder>
  ){}

  async createOrder(createOrderDto: CreateOrderDto) :Promise<IOrder>{
   const newOrder= new this.orderModel(createOrderDto)
   return newOrder.save()
  }

  async getAllOrders():Promise<IOrder[]> {
   const ordersData= await this.orderModel.find();
   
  if (!ordersData || ordersData.length==0){
    throw new NotFoundException("Orders data not found")
  }
  return ordersData

  }

   async getOrder(OrderId: string) :Promise<IOrder>{
    const existingOrder=await this.orderModel.findById(OrderId).exec();
    if(!existingOrder){
      throw new NotFoundException(`Order with id ${OrderId}} not found`)
    }
    return existingOrder
  }

  async updateOrder(OrderId: string, updateOrderDto: UpdateOrderDto) {
    const existingOrder=await this.orderModel.findByIdAndUpdate(OrderId , updateOrderDto, {new:true}).exec();
    if(!existingOrder){
     throw new NotFoundException(`Order with id ${OrderId}not found`)
    }
    return existingOrder
  }

  async deleteOrder(OrderId: string) :Promise<IOrder>{
   const deleteOrder=await this.orderModel.findByIdAndDelete(OrderId);
   if(!deleteOrder){
    throw new NotFoundException(`Order with id ${OrderId} not found `)

   }
   return deleteOrder
  }
}
