import { PartialType } from '@nestjs/swagger';
import { CreateOrderproductDto } from './create-orderproduct.dto';

export class UpdateOrderproductDto extends PartialType(CreateOrderproductDto) {}
