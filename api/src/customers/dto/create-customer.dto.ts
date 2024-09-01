import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateCustomerDto extends CreateUserDto{

  
}
