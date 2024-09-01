import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('delivery')
@ApiTags('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  async createDelivery (@Res() response ,@Body()createDeliveryDto:CreateDeliveryDto) {
    try {
      const newDelivery= await this.deliveryService.createDelivery(createDeliveryDto)
      return response.status(HttpStatus.CREATED).json({
        message:'Delivery has been created Successfully',
        status:HttpStatus.CREATED,
        data:newDelivery
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Error delivery not created' + err,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }



  @Get()
  async getAllDeliveries(@Res()response) {
    try {
      const deliveriesData=await this.deliveryService.getAllDeliveries();
      return response.status(HttpStatus.OK).json({
        message:'All deliveries data found successfully ',
      status:HttpStatus.OK,
      data: deliveriesData
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
    }

  @Get(':id')
  async getDelivery(@Res() response ,@Param('id') DeliveryId: string) {
    try {
     const existingDelivery=await this.deliveryService.getDelivery(DeliveryId);
     return response.status(HttpStatus.OK).json({
       message:"Delivery found by id successfully",
       status:HttpStatus.OK,
       data:existingDelivery
     })
    } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
       message:err.message,
       status:HttpStatus.BAD_REQUEST,
       data:null
     })
    }
   }

  @Patch(':id')
  async updateDelivery(@Res()response ,@Param('id') DeliveryId: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    try {
      const existingDelivery=await this.deliveryService.updateDelivery(DeliveryId, updateDeliveryDto)
      return response.status(HttpStatus.OK).json({
        message:"Delivery has been successfully updated ",
        status:HttpStatus.OK,
        data:existingDelivery
      })
      
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
      }

  @Delete(':id')
  async deleteDelivery(@Res() response,@Param('id') DeliveryId: string) {
    try {
      const deleteDelivery=await this.deliveryService.deleteDelivery(DeliveryId)
      return response.status(HttpStatus.OK).json({
        message:"Delivery deleted  successfully ",
        status:HttpStatus.OK,
        data:deleteDelivery
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:err.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }
}
