import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";

export class Delivery extends Document{
    @Prop({required:true})
    deliveryDate :string;

    @Prop({required:true})
    deliveryDescription:string ;

    @Prop({required:true})
    deliveryMethod:string ;
    @Prop({type:SchemaTypes.ObjectId,ref:'orders',required:true})
    order:Types.ObjectId;
}
export const DeliverySchema=SchemaFactory.createForClass(Delivery)