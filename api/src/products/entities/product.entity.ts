import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({timestamps:true})
export class Product extends Document{
    @Prop({required:true , unique:true})
    name:string ;
    @Prop({required:true})
    description:string;
    @Prop({required:true})
    price:string;
    @Prop({required:true})
    qte:string;
    @Prop({required:false})
    newproduct:string;
    @Prop({type:SchemaTypes.ObjectId,ref:'categories',required:true})
    category:Types.ObjectId;
    @Prop({required:true})
    images:string[];
    @Prop([{type:SchemaTypes.ObjectId,ref:'orderproduct'}])
    orderproduct:Types.ObjectId[];
}
export const ProductSchema=SchemaFactory.createForClass(Product)
