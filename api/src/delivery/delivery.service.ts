import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDelivery } from './interfaces/delivery.interface';
import { IOrder } from 'src/orders/interfaces/order.interface';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel('delivery')
    private deliveryModel:Model<IDelivery>,
    @InjectModel('orders')
    private orderModel:Model<IOrder>
  ){}
  async  createDelivery(createDeliveryDto:CreateDeliveryDto):Promise<IDelivery> {
    const newDelivery=new this.deliveryModel(createDeliveryDto);
    await this.orderModel.updateOne({_id:createDeliveryDto.order},
      {$push:{delivery:newDelivery._id}})
    return newDelivery.save()
      }

      async getAllDeliveries():Promise<IDelivery[]>{
        const deliveriesData=await this.deliveryModel.find();
        if (!deliveriesData || deliveriesData.length==0){
         throw new NotFoundException("Deliveries data not found")
        }
        return deliveriesData
       }

       async getDelivery(DeliveryId: string):Promise<IDelivery> {
        const existingDelivery=await this.deliveryModel.findById(DeliveryId).exec();
        if(!existingDelivery){
         throw new NotFoundException (`Delivery with id ${DeliveryId} not found`)
        }
        return existingDelivery
       }

 
  async updateDelivery(DeliveryId: string, updateDeliveryDto: UpdateDeliveryDto) {
    const existingDelivery=await this.deliveryModel.findByIdAndUpdate(DeliveryId,updateDeliveryDto,{new :true}).exec();
    if(!existingDelivery){
      throw new NotFoundException (`Delivery with id ${DeliveryId} not found`)
    }
    return existingDelivery
  }



  async deleteDelivery(DeliveryId:string ):Promise <IDelivery> {
    const deleteDelivery = await this.deliveryModel.findByIdAndDelete(DeliveryId);
    await this.orderModel.updateOne({_id:deleteDelivery.order},
      {$pull:{delivery:deleteDelivery._id}})
    if(!deleteDelivery){
      throw new NotFoundException (`Delivery with id ${DeliveryId} not found`)
    }
    return deleteDelivery
  }
}
