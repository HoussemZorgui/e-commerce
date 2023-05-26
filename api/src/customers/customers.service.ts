import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ICustomer } from './interfaces/customer.interface';

@Injectable()
export class CustomersService {

  constructor (
    @InjectModel("customers")
    private customerModel:Model<ICustomer>
  ) 
  {}
 async  createCustomer(createCustomerDto: CreateCustomerDto):Promise<ICustomer> {
const newCustomer=new this.customerModel(createCustomerDto)
return newCustomer.save()
  }

  async getAllCustomers():Promise<ICustomer[]>{
   const customersData=await this.customerModel.find();
   if (!customersData || customersData.length==0){
    throw new NotFoundException("Customers data not found")
   }
   return customersData
  }

  async getCustomer(CustomerId: string):Promise<ICustomer> {
   const existingCustomer=await this.customerModel.findById(CustomerId).exec();
   if(!existingCustomer){
    throw new NotFoundException (`Customer with id ${CustomerId} not found`)
   }
   return existingCustomer
  }

  async updateCustomer(CustomerId: string, updateCustomerDto: UpdateCustomerDto) {
    const existingCustomer=await this.customerModel.findByIdAndUpdate(CustomerId,updateCustomerDto,{new :true}).exec();
    if(!existingCustomer){
      throw new NotFoundException (`Customer with id ${CustomerId} not found`)
    }
    return existingCustomer
  }

  async deleteCustomer(CustomerId:string ):Promise <ICustomer> {
    const deleteCustomer = await this.customerModel.findByIdAndDelete(CustomerId);
    if(!deleteCustomer){
      throw new NotFoundException (`Customer with id ${CustomerId} not found`)
    }
    return deleteCustomer
  }
}
