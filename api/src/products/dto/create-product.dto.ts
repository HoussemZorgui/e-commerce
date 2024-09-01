import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        type:String,
        description:"this is required property"
    })

    @IsString()
    @IsNotEmpty()
    name:string ;

    @ApiProperty({
        type:String,
        description:"this is required property"
    })

    @IsString()
    @IsNotEmpty()
    newproduct:string ;
    @ApiProperty({
        type:String,
        description:"this is required property"
    })

    @IsString()
    @IsNotEmpty()
    qte:string ;




    
    @ApiProperty({
        type:String,
        description:"this is required property"
    })
    
    @IsString()
    @IsNotEmpty()
    description:string ;

    @ApiProperty({
        type:String,
        description:"this is required property"
    })
    
    @IsString()
    @IsNotEmpty()
    price:string ;

    @ApiProperty({
        type:String,
        description:"this is required property",
    })
    @IsString()
    @IsNotEmpty()
    readonly category:string;

    @ApiProperty({
        type:Array,
        description:"this is required property"
    })
    @IsArray()
    @IsNotEmpty()
    images:string[]
}
