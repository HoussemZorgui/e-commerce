import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderproductDto {

    @ApiProperty({
        type:String,
        description:"this is required property"
    })

    @IsNumber()
    @IsNotEmpty()
    total :number;

    @ApiProperty({
        type:String,
        description:"this is required property",
    })
    @IsString()
    @IsNotEmpty()
    readonly order:string;

    @ApiProperty({
        type:String,
        description:"this is required property",
    })
    @IsString()
    @IsNotEmpty()
    readonly product:string;


}
