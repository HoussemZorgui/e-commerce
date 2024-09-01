import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { unlink } from 'fs';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('newproduct')
  async findAllNewProduct(@Query('newproduct') newproduct:string,@Res() response){
try {
  const existingProduct =await this.productsService.findAllNewProduct(newproduct);
  return response.status(HttpStatus.OK).json({
    message:"Product found successfully",
    status:HttpStatus.OK,
    data:existingProduct
  })
}
catch (error){
  return response.status(HttpStatus.BAD_REQUEST).json({
    message: error.message,
    status:HttpStatus.BAD_REQUEST,
    data:null
  })
}
  }

  @Post()

   
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        name:{type:'string'},
        description:{type:'string'},
        price:{type:'string'},
        newproduct:{type:'string'},
        qte:{type:'string'},
        category:{type:'string'},
        files:{
          type:'array',
          items:{
            type:'string',
            format:'binary'
        }
          
        }
      }
      
    }
  })
  @UseInterceptors(
    FilesInterceptor("files",3,{
      storage:diskStorage({
        destination:"./upload/products",
        filename:(_request,file,callback)=>
        callback(null,`${new Date().getTime()}-${file.originalname}`)
      })
    })
  )
 async createProduct(@Res() response ,@Body() createProductDto: CreateProductDto ,  @UploadedFiles()files) {
   try {
    createProductDto.images=files.map(item=>item.filename)
    const newProduct=await this.productsService.createProduct(createProductDto)
    return response.status(HttpStatus.CREATED).json({
      message:'Product has been created Successfully',
      status:HttpStatus.CREATED,
      data:newProduct
    })
    
   } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message:'error Product not created '+err,
      status:HttpStatus.BAD_REQUEST,
      data:null
    })
    
   }
  }

  @Get()
  async getAllProducts(@Res() response) {
    try {
      const productsData=await this.productsService.getAllProducts();
      return response.status(HttpStatus.OK).json({
        message:'All products data found successfully',
        status:HttpStatus.OK,
        data:productsData
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
    description:"should be an id of products that existing in the database",
    type:String
  })
  async getProduct(@Res()response ,@Param('id') ProductId: string) {
   try {
    const existingProduct=await this.productsService.getProduct(ProductId);
    return response.status(HttpStatus.OK).json({
    message:"Product found by id Successfully",
    status:HttpStatus.OK,
    data:existingProduct
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
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        name:{type:'string'},
        description:{type:'string'},
        price:{type:'string'},
        newproduct:{type:'string'},
        qte:{type:'string'},
        category:{type:'string'},
        files:{
          type:'array',
          items:{
            type:'string',
            format:'binary'
        }
        }
      }
    }
  })
  @UseInterceptors(
    FilesInterceptor("files",3,{
      storage:diskStorage({
        destination:"./upload/products",
        filename:(_request,file,callback)=>
        callback(null,`${new Date().getTime()}-${file.originalname}`)
      })
    })
  )
  async updateProduct(@Res() response ,@Param('id') ProductId: string, @Body() updateProductDto: UpdateProductDto,  @UploadedFiles()files) {
  try {
    updateProductDto.images=files.map(item=>item.filename)
    const existingProduct=await this.productsService.updateProduct(ProductId,updateProductDto)
    return response.status(HttpStatus.OK).json({
      message:"Product has been successfully updated",
      status:HttpStatus.OK,
      data:existingProduct
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
    description:"should be an id of products that existing in the database",
    type:String
  })
  async deleteProduct(@Res () response ,@Param('id') ProductId: string) {
    try {
      const deleteProduct=await this.productsService.deleteProduct(ProductId)
        unlink (join(process.cwd(), "./upload/products/"+deleteProduct.file),
      (err)=>{
        if(err){
          console.log(err);
          return err
        }
      }) 
      return response.status(HttpStatus.OK).json({
        message:"Product deleted successfully",
        status:HttpStatus.OK,
        data:deleteProduct
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
