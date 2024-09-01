import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
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
    description:string ;

    @ApiProperty({
        type:String,
        description:"this is required property"
    })

    @IsString()
    @IsNotEmpty()
    file:string;
}
