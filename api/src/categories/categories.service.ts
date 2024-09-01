import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categories')
    private categoryModel:Model<ICategory>
  ){}

  async createCategory(createCategoryDto: CreateCategoryDto):Promise<ICategory> {
    const newCategory=new this.categoryModel(createCategoryDto)
    return newCategory.save()
   }

  async getAllCategories():Promise<ICategory[]> {
  const categoriesData= await this.categoryModel.find()

  if (!categoriesData || categoriesData.length==0){
    throw new NotFoundException("Categories data not found")
  }
  return categoriesData
  }

  async getCategory(CategoryId: string):Promise<ICategory> {
    const existingCategory=await this.categoryModel.findById(CategoryId).exec();
    if(!existingCategory){
      throw new NotFoundException(`Category with id ${CategoryId} not found`)
    }
    return existingCategory
  }

  async updateCategory(CategoryId: string, updateCategoryDto: UpdateCategoryDto){
    const existingCategory=await this.categoryModel.findByIdAndUpdate(CategoryId , updateCategoryDto, {new:true}).exec();
    if(!existingCategory){
     throw new NotFoundException(`Category with id ${CategoryId}not found`)
    }
    return existingCategory
   }

   async deleteCategory(CategoryId: string):Promise<ICategory>{
    const deletedCategory=await this.categoryModel.findByIdAndDelete(CategoryId);
    if(!deletedCategory){
        throw new NotFoundException(`Category with id ${CategoryId}not found`)
    }
    return deletedCategory
  }
}
