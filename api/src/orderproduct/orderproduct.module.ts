import { Module } from '@nestjs/common';
import { OrderproductService } from './orderproduct.service';
import { OrderproductController } from './orderproduct.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Orderproduct, OrderproductSchema } from './entities/orderproduct.entity';
import { OrderSchema } from 'src/orders/entities/order.entity';
import { ProductSchema } from 'src/products/entities/product.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'orderproducts',schema:OrderproductSchema}]),
MongooseModule.forFeature([{name:'orders',schema:OrderSchema}]),
MongooseModule.forFeature([{name:'products',schema:ProductSchema}])],
  controllers: [OrderproductController],
  providers: [OrderproductService]
})
export class OrderproductModule {}
