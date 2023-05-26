import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { OrderproductService } from './orderproduct.service';
import { CreateOrderproductDto } from './dto/create-orderproduct.dto';
import { UpdateOrderproductDto } from './dto/update-orderproduct.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('orderproduct')
@ApiTags('orderproduct')
export class OrderproductController {
  constructor(private readonly orderproductService: OrderproductService) {}

  @Post()
  async createOrderproduct(@Res() response ,@Body() createOrderproductDto: CreateOrderproductDto) {
try {
  const newOrderproduct= await this.orderproductService.createOrderproduct(createOrderproductDto)
  return response.status(HttpStatus.CREATED).json({
    message:'Orderproduct has been created Successfully',
    status:HttpStatus.CREATED,
    data:newOrderproduct
  })
  
} catch (err) {
  return response.status(HttpStatus.BAD_REQUEST).json({
    message:'Error orderproduct not created' + err,
    status:HttpStatus.BAD_REQUEST,
    data:null
  })
}
  }

  @Get()
  findAll() {
    return this.orderproductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderproductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderproductDto: UpdateOrderproductDto) {
    return this.orderproductService.update(+id, updateOrderproductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderproductService.remove(+id);
  }
}
