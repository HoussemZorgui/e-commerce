import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from 'src/categories/interfaces/category.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('products')
    private productModel:Model<IProduct>,
    @InjectModel('categories')
    private categoryModel:Model<ICategory>

  ){}

  async createProduct(createProductDto: CreateProductDto):Promise<IProduct> {
const newProduct=new this.productModel(createProductDto);
await this.categoryModel.updateOne({_id:createProductDto.category},
  {$push:{products:newProduct._id}})
return newProduct.save()
  }

 async getAllProducts() :Promise<IProduct[]>{
   const productsData=await this.productModel.find().populate('category')
if(!productsData||productsData.length==0){
  throw new NotFoundException ("Products data not found")
}
return productsData
  }
  async findAllProductbyCategory(category:string):Promise<IProduct[]>{
    return this.productModel.find({category}).exec();
  }
  async findAllNewProduct(newproduct : string):Promise<IProduct[]> {
    return this.productModel.find({newproduct}).exec();
  }


 async getProduct(ProductId: string) :Promise<IProduct>{
   const existingProduct= await this.productModel.findById(ProductId).exec();
   if(!existingProduct){
    throw new NotFoundException(`Product with id ${ProductId} not found `)
   }
   return existingProduct
  }

  async updateProduct(ProductId: string, updateProductDto: UpdateProductDto) {
   const existingProduct=await this.productModel.findByIdAndUpdate(ProductId,updateProductDto,{new:true}).exec();
   if (!existingProduct){
    throw new NotFoundException(`Product with id ${ProductId} not found `)
   }
   return existingProduct
  }

  async deleteProduct(ProductId: string):Promise<IProduct> {
   const deleteProduct=await this.productModel.findByIdAndDelete(ProductId);
   await this.categoryModel.updateOne({_id:deleteProduct.category},
   {
    $pull:{products:deleteProduct._id}
   } )
   if (!deleteProduct){
    throw new NotFoundException(`Product with id ${ProductId} not found `)
   }
   return deleteProduct
  }
}
