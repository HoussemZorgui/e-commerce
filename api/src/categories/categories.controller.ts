import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { unlink } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()

  @ApiBody({
    schema:{
      type:'object',
      properties:{
        name:{type:'string'},
        description:{type:'string'},
        file:{
          type:'string',
        format:'binary'
      }
      }
    }
  })

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("file",{
      storage:diskStorage({
        destination:"./upload/categories",
        filename:(_request,file,callback)=>
        callback(null,`${new Date().getTime()}-${file.originalname}`)
      })
    })
  )
  async createCategory(@Res() response ,@Body() createCategoryDto: CreateCategoryDto , @UploadedFile()file:Express.Multer.File) {
    try {
      createCategoryDto.file=file.filename
      
     const newCategory=await this.categoriesService.createCategory(createCategoryDto)
     return response.status(HttpStatus.CREATED).json({
       message:' Category has been created Successfully ',
       status:HttpStatus.CREATED,
       data:newCategory
     })
   
    } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
       message:'Error Category not created '+ err,
       status:HttpStatus.BAD_REQUEST,
       data:null
     })
     
    }
     }

  @Get()
  async getAllCategories(@Res ()response) {
    try {
      const categoriesData=await this.categoriesService.getAllCategories();
      return response.status(HttpStatus.OK).json({
        message:'All categories data found successfully ',
        status:HttpStatus.OK,
        data:categoriesData
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
  @ApiParam({
    name:"id",
    required:true,
    description:"should be an id of categories that existing in the database",
    type:String
  })
  async getCategory(@Res() response ,@Param('id') CategoryId: string) {
    try {
      const existingCategory=await this.categoriesService.getCategory(CategoryId);
      return response.status(HttpStatus.OK).json({
        message:"Category found by id successfully",
        status:HttpStatus.OK,
        data:existingCategory
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
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        name:{type:'string'},
        description:{type:'string'},
        file:{
          type:'string',
        format:'binary'
      }
      }
    }
  })

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("file",{
      storage:diskStorage({
        destination:"./upload/categories",
        filename:(_request,file,callback)=>
        callback(null,`${new Date().getTime()}-${file.originalname}`)
      })
    })
  )

  @ApiParam({
    name:"id",
    required:true,
    description:"should be an id of categories that existing in the database",
    type:String
  })
  async  updateCategory(@Res() response , @Param('id') CategoryId: string, @Body() updateCategoryDto: UpdateCategoryDto, @UploadedFile()file:Express.Multer.File) {
    try {
      updateCategoryDto.file=file.filename
      const existingCategory=await this.categoriesService.updateCategory(CategoryId,updateCategoryDto)
      return response.status(HttpStatus.OK).json({
        message:"Category has been successfully updated ",
        status:HttpStatus.OK,
        data:existingCategory
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
  @ApiParam({
    name:"id",
    required:true,
    description:"should be an id of categories that existing in the database",
    type:String
  })
  async deleteCategory(@Res() response,@Param('id') CategoryId: string) {
    try {
      const deletedCategory=await this.categoriesService.deleteCategory(CategoryId)
      unlink (join(process.cwd(), "./upload/categories/"+deletedCategory.file),
      (err)=>{
        if(err){
          console.log(err);
          return err
        }
      })
      return response.status(HttpStatus.OK).json({
        message:"Category deleted  successfully ",
        status:HttpStatus.OK,
        data:deletedCategory
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
