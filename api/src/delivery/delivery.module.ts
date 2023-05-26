import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliverySchema } from './entities/delivery.entity';
import { OrderSchema } from 'src/orders/entities/order.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'delivery',schema:DeliverySchema}]),
MongooseModule.forFeature([{name:'orders',schema:OrderSchema}])],
  controllers: [DeliveryController],
  providers: [DeliveryService]
})
export class DeliveryModule {}
