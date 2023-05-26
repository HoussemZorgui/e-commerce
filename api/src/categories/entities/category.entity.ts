import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

@Schema({timestamps:true})
export class Category extends Document{
    @Prop({required:true,unique:true})
    name:string; 
    @Prop({required:true})
    description:string;
    @Prop({required:true})
    file:string;
    @Prop([{type:SchemaTypes.ObjectId,ref:'products'}])
    products:Types.ObjectId[];
}
export const CategorySchema=SchemaFactory.createForClass(Category)