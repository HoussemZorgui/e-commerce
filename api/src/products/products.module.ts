import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/product.entity';
import { CategorySchema } from 'src/categories/entities/category.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MongooseModule.forFeature([{name:'products',schema:ProductSchema}]),
  MongooseModule.forFeature([{name:'categories',schema:CategorySchema}]),
MulterModule.register({
  dest:'/dest.upload' 
})],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
