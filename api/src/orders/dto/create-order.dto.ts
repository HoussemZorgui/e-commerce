import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {

    @ApiProperty({
        type:String,
        description:"this is required property"
    })
    @IsString()
    @IsNotEmpty()
    firstName:string;

   
   
    @ApiProperty({
        type:String,
        description:"this is required property"
    })
    @IsString()
    @IsNotEmpty()
    lastName:string;

    @ApiProperty({
        type:String,
        description:"this is required property"
    })
    @IsString()
    @IsNotEmpty()
    email:string;

    @ApiProperty({
        type:String,
        description:"this is required property"
    })
    @IsString()
    @IsNotEmpty()
    address:string;


    @ApiProperty({
        type:String,
        description:"this is required property"
    })
    @IsString()
    @IsNotEmpty()
    city:string;





    @ApiProperty({
        type:String,
        description:"this is required property"
    })
    @IsString()
    @IsNotEmpty()
    country:string;



    @ApiProperty({
        type:String,
        description:"this is required property"
    })
    @IsNumber()
    @IsNotEmpty()
    zipCode:number;

    @ApiProperty({
        type:String,
        description:"this is required property"
    })
    @IsNumber()
    @IsNotEmpty()
    phone:number;
    
    
    @ApiProperty({
        type:String,
        description:"this is required property"
    })

    @IsNumber()
    @IsNotEmpty()
    totalPrice:number;

    @ApiProperty({
        type:String,
        description:"this is required property"
    })

    @IsNumber()
    @IsNotEmpty()
    numberOforder:number;
}
