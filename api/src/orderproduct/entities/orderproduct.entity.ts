import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";


@Schema({timestamps:true})
export class Orderproduct extends Document {

   

    @Prop({type:SchemaTypes.ObjectId,ref:'orders', required:true})
    order!:Types.ObjectId;

    @Prop({type:SchemaTypes.ObjectId,ref:'products', required:true})
    product!:Types.ObjectId;
}
export const OrderproductSchema=SchemaFactory.createForClass(Orderproduct)