import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLoginDto{
    @ApiProperty({
        type:String,
        description:'this is required property'
    })
    @IsNotEmpty()
    readonly username:string ;

    @ApiProperty({
        type:String,
        description:'this is required property'
    })
    @IsNotEmpty()
    readonly password:string ;
}