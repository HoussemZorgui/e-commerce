import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "src/users/entities/user.entity";

export type CustomerDocument=HydratedDocument<Customer>;
@Schema({timestamps:true})
export class Customer  {

items:string ;


}

export const CustomerSchema=SchemaFactory.createForClass(Customer)

