import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './entities/category.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MongooseModule.forFeature([{name:'categories',schema:CategorySchema}]),
  MulterModule.register({dest:"./upload"})],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
