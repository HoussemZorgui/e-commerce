import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('customers')
@ApiTags('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createCustomer (@Res() response ,@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const newCustomer= await this.customersService.createCustomer(createCustomerDto)
      return response.status(HttpStatus.CREATED).json({
        message:'Customer has been created Successfully',
        status:HttpStatus.CREATED,
        data:newCustomer
      })
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Error customer not created' + err,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @Get()
  async getAllCustomers(@Res()response) {
  try {
    const customersData=await this.customersService.getAllCustomers();
    return response.status(HttpStatus.OK).json({
      message:'All customers data found successfully ',
    status:HttpStatus.OK,
    data:customersData
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
  async getCustomer(@Res() response ,@Param('id') CustomerId: string) {
   try {
    const existingCustomer=await this.customersService.getCustomer(CustomerId);
    return response.status(HttpStatus.OK).json({
      message:"Customer found by id successfully",
      status:HttpStatus.OK,
      data:existingCustomer
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
 async updateCustomer(@Res()response ,@Param('id') CustomerId: string, @Body() updateCustomerDto: UpdateCustomerDto) {
try {
  const existingCustomer=await this.customersService.updateCustomer(CustomerId,updateCustomerDto)
  return response.status(HttpStatus.OK).json({
    message:"Category has been successfully updated ",
    status:HttpStatus.OK,
    data:existingCustomer
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
  async deleteCustomer(@Res() response,@Param('id') CustomerId: string) {
    try {
      const deleteCustomer=await this.customersService.deleteCustomer(CustomerId)
      return response.status(HttpStatus.OK).json({
        message:"Customer deleted  successfully ",
        status:HttpStatus.OK,
        data:deleteCustomer
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
