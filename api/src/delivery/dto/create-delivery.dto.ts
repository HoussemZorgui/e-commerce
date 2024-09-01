import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDeliveryDto {
    @ApiProperty({
        type:String,
        description:"this is required property",
    })
    @IsString()
    @IsNotEmpty()
    deliveryDate :string;

    @ApiProperty({
        type:String,
        description:"this is required property",
    })
    @IsString()
    @IsNotEmpty()
    deliveryDescription:string ;

    @ApiProperty({
        type:String,
        description:"this is required property",
    })
    @IsString()
    @IsNotEmpty()
    deliveryMethod:string ;
    @ApiProperty({
        type:String,
        description:"this is required property",
    })
    @IsString()
    @IsNotEmpty()
    readonly order:string;
}
