import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'this is required property',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'this is required property',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'this is required property',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'this is required property',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: Number,
    description: 'this is required property',
  })
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({
    type: String,
    description: 'this is required property',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'this is required property',
  })
  @IsString()
  @IsNotEmpty()
  adress: string;

  @ApiProperty({
    type: String,
    description: 'this is required property',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: String,
    description: 'this is required property',
  })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  refreshToken: string;

  @ApiProperty({
    type: String,
    description: 'this is a required property',
  })
  @IsString()
  @IsNotEmpty()
  items: string;
}
