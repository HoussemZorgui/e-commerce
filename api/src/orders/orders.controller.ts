import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { Order } from './entities/order.entity';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
@ApiBearerAuth('access-token')
@UseGuards(AccessTokenGuard)
  @Post()
 async createOrder(@Res() response ,@Body()  createOrderDto: CreateOrderDto) {
   try {
    const newOrder=await this.ordersService.createOrder(createOrderDto)
    return response.status(HttpStatus.CREATED).json({
      message:' Order has been created Successfully ',
      status:HttpStatus.CREATED,
      data:newOrder
    })
   } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message:'Error Order not created '+ err,
      status:HttpStatus.BAD_REQUEST,
      data:null
    })
   }
  }

  @Get()
 async getAllOrders(@Res () response) {
  try {
    const ordersData=await this.ordersService.getAllOrders();
    return response.status(HttpStatus.OK).json({
      message:'All orders data found successfully ',
      status:HttpStatus.OK,
      data:ordersData
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
  async getOrder(@Res() response ,@Param('id') OrderId: string) {
    try {
      const existingOrder=await this.ordersService.getOrder(OrderId);
      return response.status(HttpStatus.OK).json({
        message:"Category found by id successfully",
        status:HttpStatus.OK,
        data:existingOrder
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
  async updateOrder(@Res() response ,@Param('id') OrderId: string, @Body() updateOrderDto: UpdateOrderDto) {
  try {
    const existingOrder=await this.ordersService.updateOrder(OrderId,updateOrderDto)
    return response.status(HttpStatus.OK).json({
      message:"Order has been successfully updated ",
      status:HttpStatus.OK,
      data:existingOrder
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
  async deleteOrder(@Res() response,@Param('id') OrderId: string) {
   try {
    const deleteOrder=await this.ordersService.deleteOrder(OrderId)
    return response.status(HttpStatus.OK).json({
      message:"Order deleted  successfully ",
      status:HttpStatus.OK,
      data:deleteOrder
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
